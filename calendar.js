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