const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//logar no sistema
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("emailInput").value;
    const senha = document.getElementById("senhaInput").value;
    const checkSession = document.getElementById("sessionCheck").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Verifique o usuário ou a senha.")
        return;
    }

    if(account) {
        if(account.senha !== senha) {
            alert("Verifique o usuário ou a senha");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }
});

//criar conta
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("registerEmail").value;
    const senha = document.getElementById("registerPassword").value;

    if(email.length < 5) {
        alert("Por favor, insira um email válido.");
        return;
    } 

    if(senha.length < 4){
        alert("A senha deve ter mais de 4 caracteres");
        return;
    }

    saveAccount({
        email: email,
        senha: senha,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso!");
});

function checkLogged()  {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.email, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return null;
}

