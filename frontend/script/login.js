document.querySelector("#btn-login").addEventListener("click", login);

async function login() {
    const email = document.querySelector("#inputEmail").value;
    const password = document.querySelector("#inputPassword").value;

    if(email == "" || password == ""){
        alert("Preencha todos os campos!");
        return;
    }

    const dataLogin = {
        email,
        password
    }

    const reply = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: { "Content-type":"application/json" },
        body: JSON.stringify(dataLogin),
    });

    const data = await reply.json();

    if(reply.status != 200){
        alert("Email ou senha inválidos!", reply.status);
        return;
    }

    /* Aprender sobre cookies e corrigir o armazenamento do token! */
    window.localStorage.setItem("token", data.token);

    window.location.href = data.redirect;

}