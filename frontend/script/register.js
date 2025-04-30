document.querySelector("#register-button").addEventListener("click", register);

async function register() {
    const name = document.querySelector("#name-input").value;
    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;
    const dob = document.querySelector("#dob-input").value;
    if(name == "" || email == "" || password == "" || dob == ""){
        alert("Preencha todos os campos!");
        return;
    }
    const dataRegister = {
        name,
        email,
        password,
        dob
    }
    const reply = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: { "Content-type":"application/json" },
        body: JSON.stringify(dataRegister),
    });

    const data = await reply.json();

    console.log(data);

    if(reply.status != 201){
        alert("Dados inseridos inválidos!", reply.status);
        return;
    }    

    window.location.href = data.redirect;
}