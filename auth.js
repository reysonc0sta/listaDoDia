const CLIENT_ID = "699357564872-c6tg0s9fcqlp73q2u7ht0ao6fd1cnp5q.apps.googleusercontent.com";
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
                document.getElementById("btnLogin").style.display = "none";
                eventListGoogle()
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
