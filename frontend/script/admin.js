const apiUrl = 'http://localhost:8080/subscription/find/'; // Ajuste para seu backend
const loginLogoutButton = document.getElementById("login-logout-button");
const homeButton = document.getElementById("home-button");
homeButton.onclick = function () {
    window.location.href = "/pages/home.html";
}
let allEvents = [];

async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (response.status === 401) {
            showUnauthorizedModal(response.status);
            return;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro de rede: ", error);
    }
}

function showUnauthorizedModal(statusCode) {
    const modal = document.getElementById("unauthorizedModal");
    const modalTitle = document.getElementById("modal-title");
    const modalMessage = document.getElementById("modal-message");
    const registerButton = document.getElementById("register-button");
    const loginButton = document.getElementById("login-button");

    loginLogoutButton.textContent = "Entrar em minha conta"
    loginLogoutButton.onclick = function () {
        window.location.href = "/pages/login.html";
    }

    modal.style.display = "block";

    if (statusCode === 404) {
        modalTitle.textContent = "Opa, quem é você?";
        modalMessage.textContent = "Para visualizar o painel de gerenciamento é preciso estar logado em sua conta de administrador.";
    }
    if (statusCode === 401) {
        modalTitle.textContent = "Opa, sua sessão expirou!";
        modalMessage.textContent = "Para visualizar o painel de gerenciamento é preciso que realize o login novamente!";
        registerButton.style = "display: none";
        loginButton.textContent = "Entrar Novamente";
    }

    registerButton.onclick = function () {
        window.location.href = "/pages/register.html";
    }

    loginButton.onclick = function () {
        window.location.href = "/pages/login.html";
    }
}

async function showConfirmationModal(eventId) {
    const modal = document.getElementById("confirmation-modal");
    const rejectButton = document.getElementById("reject-button");
    const confirmButton = document.getElementById("confirm-button");

    modal.style.display = "block";

    confirmButton.onclick = async function () {
        const token = window.localStorage.getItem("token");
        console.log(eventId);
        try {
            const response = await fetch("http://localhost:8080/events/delete/" + eventId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                }
            });
            if (response.status === 401) {
                modal.style.display = "none";
                showUnauthorizedModal(401);
            }
            if (!response.ok) {
                throw new Error('Erro ao realizar cancelamento');
            }
            location.reload();
        } catch (error) {
            console.error('Erro ao realizar cancelamento:', error);
        }
    }

    rejectButton.onclick = function () {
        modal.style.display = "none";
    }

}

async function showRegisteredsModal(eventId) {
    const modal = document.getElementById("registereds-modal");
    const infos = document.getElementById("infos");
    const rejectButton = document.getElementById("reject-button");

    modal.style.display = "block";

    const token = window.localStorage.getItem("token");
    try {
        const response = await fetch("http://localhost:8080/subscription/registered/" + eventId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token
            }
        });
        if (response.status === 401) {
            modal.style.display = "none";
            showUnauthorizedModal(401);
        }
        if (!response.ok) {
            infos.textContent = "Nenhum inscrito encontrado para esse evento.";
            throw new Error();
        }
        const data = await response.json();
        const registereds = data.users;
        const container = document.getElementById('registereds');
        container.innerHTML = '';
        registereds.forEach(user => {
            const userInfo = document.createElement('div');
            userInfo.classList.add('userInfo');
            userInfo.innerHTML = `
                <p>${user.name} - ${user.email}</p>
            `;
            container.appendChild(userInfo);
        });

    } catch (error) {
        console.error('Erro ao mostrar inscritos:', error);
    }

    rejectButton.onclick = function () {
        modal.style.display = "none";
    }
}

window.onclick = function (event) {
    const modal = document.getElementById("unauthorizedModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

async function fetchEvents() {
    try {
        const token = window.localStorage.getItem("token");
        if (!token) {
            showUnauthorizedModal(404);
        } else {
            const response = await apiRequest("http://localhost:8080/events/all", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response;
            loginLogoutButton.textContent = "Realizar Logout"
            loginLogoutButton.onclick = function () {
                window.localStorage.removeItem("token");
                showUnauthorizedModal(404);
                renderEvents();
            }
            renderEvents(data.events);
        }
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        document.getElementById('events').innerHTML = '<h2>Nenhuma inscrição encontrada.</h2>';
    }
}

function renderEvents(events) {
    const container = document.getElementById('events');
    container.innerHTML = '';

    events.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <div class="card__shine"></div>
        <div class="card__glow"></div>
        <div class="card__content">
            <div class="card__image" style="--bg-color: #a78bfa; background-image: url('${event.image_url || ''}'); background-size: cover; background-position: center;"></div>
            <div class="card__text">
            <p class="card__title">${event.title}</p>
            <p class="card__description">${event.description}</p>
            </div>
            <div class="card__footer">
            <div class="card__date">${new Date(event.date).toLocaleDateString()}</div>
            <button class="card-button-registered" data-event-id="${event.id}">Ver Inscritos</button>
            <button class="card-button-delete" data-event-id="${event.id}">Cancelar Evento</button>
            </div>
        </div>
        `;
        container.appendChild(card);
        const cardButtonsRegistered = document.querySelectorAll('.card-button-registered');
        cardButtonsRegistered.forEach(button => {
            const eventId = button.getAttribute('data-event-id');
            button.addEventListener("click", function () {
                showRegisteredsModal(eventId);
            });
        });
        const cardButtonsDelete = document.querySelectorAll('.card-button-delete');
        cardButtonsDelete.forEach(button => {
            const eventId = button.getAttribute('data-event-id');
            button.addEventListener("click", function () {
                showConfirmationModal(eventId);
            });
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredEvents = allEvents.filter(event =>
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm)
        );
        renderEvents(filteredEvents);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
    setupSearch();
});