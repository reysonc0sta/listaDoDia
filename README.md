# Lista do Dia

Aplicação web para organizar o dia: tarefas locais e compromissos da Google Agenda, separados em três colunas por período — **Manhã** (05:00–11:59), **Tarde** (12:00–17:59) e **Noite** (18:00–04:59).

## Tecnologias

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- Google Calendar API + Google OAuth 2.0

## Pré-requisitos

Antes de começar, instale:

- **Node.js** 18 ou superior ([download](https://nodejs.org/))
- **npm** (já vem com o Node.js)

Para conferir se está tudo certo:

```bash
node -v
npm -v
```

## Rodar localmente

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd lista-do-dia
```

Se você já baixou o projeto, entre na pasta dele:

```bash
cd lista-do-dia
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar o Google OAuth (obrigatório)

A integração com a Google Agenda exige um **Client ID** do Google Cloud.

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um projeto (ou selecione um existente).
3. Vá em **APIs e serviços** → **Biblioteca** e ative a **Google Calendar API**.
4. Vá em **APIs e serviços** → **Tela de consentimento OAuth** e configure o consentimento (tipo **Externo** serve para testes).
5. Vá em **APIs e serviços** → **Credenciais** → **Criar credenciais** → **ID do cliente OAuth**.
6. Escolha o tipo **Aplicativo da Web**.
7. Em **Origens JavaScript autorizadas**, adicione:
   - `http://localhost:5173`
8. Copie o **Client ID** gerado.

Abra o arquivo `src/App.tsx` e substitua o valor de `CLIENT_ID`:

```typescript
const CLIENT_ID = "SEU_CLIENT_ID.apps.googleusercontent.com";
```

> **Atenção:** o app roda por padrão em `http://localhost:5173`. Se você mudar a porta no Vite, atualize também a origem autorizada no Google Cloud.

### 4. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O terminal mostrará a URL local, geralmente:

```
http://localhost:5173
```

Abra esse endereço no navegador.

### 5. Usar o app

1. Clique em **Conectar pelo Google** (ou no ícone de perfil no canto superior direito).
2. Faça login e autorize o acesso à agenda e ao perfil.
3. Os compromissos do dia aparecerão nas colunas **Manhã**, **Tarde** e **Noite**.

## Scripts disponíveis

| Comando           | Descrição                                      |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Sobe o servidor de desenvolvimento com hot reload |
| `npm run build`   | Gera a versão de produção na pasta `dist/`   |
| `npm run preview` | Visualiza localmente o build de produção       |
| `npm run lint`    | Executa o ESLint no projeto                    |

## Build para produção

```bash
npm run build
npm run preview
```

O `preview` sobe um servidor local para testar o build antes de publicar.

## Estrutura do projeto

```
lista-do-dia/
├── src/
│   ├── App.tsx       # Componente principal (agenda, login, colunas)
│   ├── App.css       # Estilos do app
│   ├── main.tsx      # Ponto de entrada do React
│   └── index.css     # Estilos globais
├── index.html
├── package.json
└── vite.config.ts
```

## Problemas comuns

### "O sistema do Google ainda está carregando"

Aguarde alguns segundos e tente conectar de novo. O script do Google é carregado de forma assíncrona na primeira visita.

### Erro de origem não autorizada (`redirect_uri_mismatch` / origem bloqueada)

Confirme que `http://localhost:5173` está cadastrado em **Origens JavaScript autorizadas** no Google Cloud Console, com a mesma porta que o Vite está usando.

### Login funciona, mas a agenda não carrega

- Verifique se a **Google Calendar API** está ativada no projeto do Google Cloud.
- Na tela de consentimento OAuth, inclua escopos de leitura do calendário.
- Faça logout e conecte novamente para aceitar as permissões atualizadas.

### `CLIENT_ID` com valor `"teste"`

Substitua pelo Client ID real do Google Cloud em `src/App.tsx`, conforme o passo 3 acima.

## Licença

Projeto privado para uso pessoal e estudo.
