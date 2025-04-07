async function onLoadPage() {
    const reply = await fetch("http://localhost:8080/auth/dashboard", {
        method: "POST",
        headers: { Authorization:"Bearer " + window.localStorage.getItem("token") }
    });

    const data = await reply.json();

    console.log(data)

    if(reply.status != 200){
        document.querySelector("#alert-heading").innerHTML = "Acesso Negado!";
        document.querySelector("#alert-description").innerHTML = "Você não tem permissão para acessar essa página!";
    }else {
        document.querySelector("#alert-heading").innerHTML = "Acesso Permitido!";
        document.querySelector("#alert-description").innerHTML = data;
    }

}