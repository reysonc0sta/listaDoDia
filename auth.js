const CLIENT_ID = "SEU_CLIENT_ID_DO_GOOGLE.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

let tokenClient;
let accessToken = null;

function gisiInit() {
    console.log("O objeto google existe?", window.google);
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
                accessToken = tokenResponse.access_token;
                console.log("Sucesso!", accessToken);
                alert('Conectado ao Google com sucesso!');
                document.getElementById("btnLogin").style.display = "none";
            }
        },

    });
}

function handleLogin() {
    if (tokenClient) {
        tokenClient.requestAccessToken({ prompt: 'consent'});
    }else{
        console.error('O SDK do Google ainda não foi carregado!')
    }
}
