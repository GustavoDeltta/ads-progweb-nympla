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

    console.log(reply.status);
}