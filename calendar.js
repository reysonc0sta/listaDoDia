async function createEventGoogle(titleTask, dateTask) {
    if (!accessToken) {
        alert('Por favor, conecte-se ao Google Agenda primeiro!')
        return;
    }

    const event = {
        'summary': titleTask,
        'description': 'Tarefa criada pelo Meu To-Do App 🚀',
        'start': {
            'dateTime': `${dateTask}T09:00:00-03:00`,
            'timeZone': 'America/Sao_Paulo'
        },
        'end': {
            'dateTime': `${dateTask}T10:00:00-03:00`,
            'timeZone': 'America/Sao_Paulo'
        }
    };

    try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        });

        if (response.ok) {
            const eventData = await response.json();
            console.log("Sucesso! Evento criado no Google: ", eventData)
            alert(`Tarefa "${titleTask}" agendada no seu Google Agenda!!`);
        } else {
            const dataError = await response.json();
            console.log('Erro na API do Google', dataError);
            alert('Não foi possível agendar. Veja o console.')
        }
    } catch (error) {
        console.error('Error na requisicão: ', error);
    }
}

async function eventListGoogle() {
    if (!accessToken) {
        console.error("Sem token de acesso para listar eventos.")
        return;
    }

    const initDay = new Date();
    initDay.setHours(0, 0, 0, 0);
    const timeMin = encodeURIComponent(initDay.toISOString());

    const endDay = new Date();
    endDay.setHours(23, 59, 59, 999);
    const timeMax = encodeURIComponent(endDay.toISOString());

    const URL = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&maxResults=10`
    console.log('A url que o js gera é :', URL)

    try {
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&maxResults=10`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.ok) {
            const data = await response.json();
            const event = data.items;
            console.log("Eventos do Google buscados com sucesso:", event);
            console.log("Eventos do Google buscados com sucesso:", data);
            console.log(renderEventGoogle);
            renderEventGoogle(event);
        } else {
            console.error("Erro ao buscar eventos:", await response.json());
        }
    } catch (error) {
        console.error("Erro na requisição de listagem:", error);
    }
}

function renderEventGoogle(event) {
    const listUI = document.getElementById("listGoogle")
    listUI.innerHTML = "";

    if (!event || event.length == 0) {
        listUI.innerHTML = "<li>Nenhum compromisso próximo encontrado na agenda!</li>";
        return;
    }

    event.forEach(event => {
        const item = document.createElement("li");
        const dateHora = event.start.dateTime || event.start.date;
        const formattedDate = new Date(dateHora).toLocaleDateString('pt-BR');

        item.innerHTML = `<strong>${formattedDate}</strong> - ${event.summary}`;
        listUI.appendChild(item);
    });
}