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
        modalMessage.textContent = "Para visualizar suas inscrições é preciso estar logado em sua conta. Caso não tenha uma, cadastre-se!";
    }
    if (statusCode === 401) {
        modalTitle.textContent = "Opa, sua sessão expirou!";
        modalMessage.textContent = "Para visualizar suas inscrições é preciso que realize o login novamente!";
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

async function showConfirmationModal(subscriptionId) {
    const modal = document.getElementById("confirmation-modal");
    const rejectButton = document.getElementById("reject-button");
    const confirmButton = document.getElementById("confirm-button");

    modal.style.display = "block";

    confirmButton.onclick = async function () {
        const token = window.localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:8080/subscription/delete/" + subscriptionId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token,
                }
            });
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
            const userId = window.localStorage.getItem("userId");
            const response = await apiRequest(apiUrl + userId, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            const data = await response;
            loginLogoutButton.textContent = "Realizar Logout"
            loginLogoutButton.onclick = function () {
                window.localStorage.removeItem("token");
                showUnauthorizedModal(404);
                renderEvents();
            }
            renderEvents(data.subscriptions);
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
            <button class="card-button" data-subscription-id="${event.id}">Cancelar Inscrição</button>
            </div>
        </div>
        `;
        container.appendChild(card);
        const cardButtons = document.querySelectorAll('.card-button');
        cardButtons.forEach(button => {
            const subscriptionId = button.getAttribute('data-subscription-id');
            button.addEventListener("click", function () {
                showConfirmationModal(subscriptionId);
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