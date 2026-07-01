import { useEffect, useMemo, useState } from 'react'
import './App.css'

const CLIENT_ID = "teste";
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.profile";

type Periodo = 'manha' | 'tarde' | 'noite';

interface EventoAgenda {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
}

interface PerfilUsuario {
  name: string;
  picture: string;
}

const PERIODOS: { id: Periodo; titulo: string; emoji: string }[] = [
  { id: 'manha', titulo: 'Manhã (05:00 às 11:59)', emoji: '🌅' },
  { id: 'tarde', titulo: 'Tarde (12:00 às 17:59)', emoji: '☀️' },
  { id: 'noite', titulo: 'Noite (18:00 às 04:59)', emoji: '🌙' },
];

function getPeriodoDoDia(data: Date): Periodo {
  const hora = data.getHours();
  if (hora >= 5 && hora < 12) return 'manha';
  if (hora >= 12 && hora < 18) return 'tarde';
  return 'noite';
}

function agruparEventosPorPeriodo(eventos: EventoAgenda[]) {
  const grupos: Record<Periodo, typeof eventos> = { manha: [], tarde: [], noite: [] };

  for (const ev of eventos) {
    const inicio = ev.start.dateTime || ev.start.date;
    if (!inicio) continue;

    const data = new Date(inicio);
    const periodo = ev.start.dateTime ? getPeriodoDoDia(data) : 'manha';
    grupos[periodo].push(ev);
  }

  return grupos;
}

function formatarHorario(inicio: string, diaInteiro: boolean) {
  if (diaInteiro) return 'Dia inteiro';
  return new Date(inicio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function App() {
  const [isConect, setIsConect] = useState(false);
  const [event, setEvents] = useState<EventoAgenda[]>([]);
  const [accessToken, setAccessToken] = useState("");
  const [tokenClient, setTokenClient] = useState(null);
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);



  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initGoogle;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function initGoogle() {
    if (window.google) {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
          if (tokenResponse && tokenResponse.access_token) {
            setAccessToken(tokenResponse.access_token);
            setIsConect(true);
            alert('Conectado ao Google com sucesso!');
          }
        },
      });
      setTokenClient(client);
    }
  }

  function handleLogin() {
    if (tokenClient) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      alert("O sistema do Google ainda está carregando, espere um segundo.");
    }
  }

  useEffect(() => {
    if (!accessToken) return;

    async function searchForEvents() {
      const inicioDia = new Date();
      inicioDia.setHours(0, 0, 0, 0);
      const timeMin = encodeURIComponent(inicioDia.toISOString());

      const fimDia = new Date();
      fimDia.setHours(23, 59, 59, 999);
      const timeMax = encodeURIComponent(fimDia.toISOString());

      const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&maxResults=10`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setEvents(data.items || []);
        } else {
          console.error("Erro ao buscar agenda");
        }
      } catch (error) {
        console.error("Pane no fetch:", error);
      }
    }

    searchForEvents();
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    async function buscarPerfil() {
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          setPerfil({ name: data.name, picture: data.picture });
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    }

    buscarPerfil();
  }, [accessToken]);

  const eventosPorPeriodo = useMemo(() => agruparEventosPorPeriodo(event), [event]);

  return (
    <div className="app-layout">
      <header className="app-header">
        <span className="app-header-spacer" />
        {perfil ? (
          <img
            src={perfil.picture}
            alt={`Foto de ${perfil.name}`}
            className="profile-avatar"
            title={perfil.name}
          />
        ) : (
          <button
            type="button"
            className="profile-avatar profile-avatar--placeholder"
            onClick={handleLogin}
            title="Conectar com Google"
            aria-label="Conectar com Google"
          >
            👤
          </button>
        )}
      </header>

      <main className="container">
      <h1>Afazeres do dia!</h1>
      <p>Olá, vamos organizar o dia!</p>

      <div className="input-section">
        <input type="text" placeholder="Adicionar tarefa..." id="textAddTask" />
        <button id="buttonTask">Confirmar</button>
      </div>

      <hr />

      <h2>🗓️ Próximos Compromissos (Google Agenda)</h2>

      {!isConect ? (
        <button id="btnLogin" className="btn-google" onClick={handleLogin}>
          Conectar pelo Google 📅
        </button>
      ) : (
        <div id="listGoogle" className="agenda-periodos">
          {PERIODOS.map(({ id, titulo, emoji }) => (
            <section key={id} className="periodo-section">
              <h3>{emoji} {titulo}</h3>
              {eventosPorPeriodo[id].length === 0 ? (
                <p className="periodo-vazio">Nenhum compromisso neste período.</p>
              ) : (
                <ul>
                  {eventosPorPeriodo[id].map((ev) => {
                    const inicio = ev.start.dateTime || ev.start.date;
                    const diaInteiro = !ev.start.dateTime;

                    return (
                      <li key={ev.id}>
                        <strong>{formatarHorario(inicio, diaInteiro)}</strong>
                        {' — '}
                        {ev.summary}
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}
      </main>
    </div>
  );
}

export default App
