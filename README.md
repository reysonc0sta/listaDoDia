# 📅 Meu To-Do Agenda

Uma aplicação prática e moderna de lista de tarefas (To-Do List) integrada diretamente com a **Google Calendar API**. O projeto permite que o usuário gerencie suas tarefas locais e, simultaneamente, as agende de forma automática em sua agenda oficial do Google.

---

## 🚀 Demonstração do Fluxo

O projeto utiliza o fluxo de autenticação moderno do Google (Identity Services) para garantir a segurança dos dados.

[Tela do App] ── (Login OAuth 2.0) ──> [Servidor do Google] ── (Retorna Access Token)──┐
▲                                                                                      │
│                                                                                      ▼
[Tarefa Criada] ──(Fetch POST + Token)──> [Cria Evento na Agenda] <────────────────────┘

## 🧠 Conceitos Técnicos Aplicados

Este projeto foi desenvolvido para consolidar conhecimentos avançados de JavaScript Vanilla e integração de APIs:

* **Autenticação OAuth 2.0 (Implicit Flow):** Implementação segura utilizando o Google Identity Services SDK (`gsi/client`) diretamente no front-end, gerenciando `Access Tokens` na memória.
* **JavaScript Assíncrono (`async/await`):** Uso extensivo de funções assíncronas para gerenciar requisições de rede sem travar a interface do usuário.
* **Tratamento de Erros Resiliente (`try/catch`):** Arquitetura preparada para lidar com falhas de conexão, expiração de tokens e requisições inválidas, inspecionando detalhadamente as respostas HTTP.
* **Manipulação de DOM e Estados:** Sincronização dinâmica entre o estado do array local de tarefas e a renderização em tela.

---

## 🛠️ Como Configurar o Projeto (Google Cloud)

Para que a integração funcione, é necessário configurar as credenciais no painel do Google:

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um novo projeto chamado `Meu-toDo-Calendar`.
3. Vá em **Tela de Consentimento OAuth** (OAuth Consent Screen):
   * Defina o tipo de usuário como **Externo**.
   * Em **Usuários de teste**, adicione o e-mail do Google que você usará para testar.
4. Vá em **Acesso a Dados** (Escopos) e adicione a permissão:
   * `.../auth/calendar.events` (Leitura e escrita de eventos).
5. Vá em **Credenciais** > **Criar Credenciais** > **ID do cliente OAuth**:
   * Selecione **Aplicativo da Web**.
   * Em **Origens JavaScript autorizadas**, adicione:
     * `http://localhost:5500`
     * `http://127.0.0.1:5500`
   * Mantenha o campo *URIs de redirecionamento autorizadas* **totalmente vazio**.
6. Copie o **ID do cliente** gerado.

---

## 💻 Como Baixar e Executar Localmente

### Pré-requisitos
* [Git](https://git-scm.com/) instalado.
* [VS Code](https://code.visualstudio.com/) com a extensão **Live Server** instalada.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git)

2. **Abra o projeto no VS Code:**
Bash
cd NOME_DO_REPOSITORIO
code .

3. **Configure seu Client ID:**
Abra o arquivo auth.js e substitua a constante com a sua credencial gerada no passo anterior:

const CLIENT_ID = "SEU_CLIENT_ID_AQUI.apps.googleusercontent.com";

4. **Execute com o Live Server:**

Abra o arquivo index.html.

Clique no botão Go Live no canto inferior direito do VS Code (Porta padrão: 5500).

O projeto abrirá no navegador no endereço http://127.0.0.1:5500.

📝 Como Usar a Aplicação
Ao abrir a página, clique no botão "Conectar com Google Agenda".

Faça login com a conta cadastrada nos Usuários de Teste do console do Google.

Aceite as permissões de desenvolvedor não verificado (clique em Avançado > Ir para Meu ToDo Agenda).

Digite uma tarefa no campo de texto e clique em Adicionar.

O app salvará a tarefa na sua lista da tela e disparará uma requisição em segundo plano criando um evento automático para o dia de hoje na sua agenda oficial do Google!

✉️ Desenvolvido por Reyson Costa — Sinta-se à vontade para se conectar!