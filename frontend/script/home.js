const apiUrl = 'http://localhost:8080/events/all';
const loginLogoutButton = document.getElementById("login-logout-button");
const subscriptionsButton = document.getElementById("subscriptions");
subscriptionsButton.onclick = function () {
    window.location.href = "/pages/subscriptions.html";
}
let allEvents = [];

const token = window.localStorage.getItem("token");
if (!token) {
    loginLogoutButton.textContent = "Entrar em minha conta"
    loginLogoutButton.onclick = function () {
        window.location.href = "/pages/login.html";
    }
} else {
    loginLogoutButton.textContent = "Realizar Logout"
    loginLogoutButton.onclick = function () {
        window.localStorage.removeItem("token");
        location.reload();
    }
}

async function showConfirmationModal(eventId) {
    const modal = document.getElementById("confirm-subscription-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalMessage = document.getElementById("modal-message");
    const registerButton = document.getElementById("register-button");
    const loginButton = document.getElementById("login-button");

    console.log(eventId);

    modal.style.display = "block";

    if (!token) {
        modalTitle.textContent = "Opa, quem é você?";
        modalMessage.textContent = "Para realizar uma inscrição é preciso estar logado em sua conta. Caso não tenha uma, cadastre-se!";
        loginButton.textContent = "Entrar";
        loginButton.onclick = function () {
            window.location.href = "/pages/login.html";
        }
    } else {
        modalTitle.textContent = "Só faltava você!";
        modalMessage.textContent = "Sua inscrição foi confirmada, que bom que você aparecerá.";
        registerButton.style.display = "none"
        loginButton.textContent = "Ver Minhas Inscrições"
        loginButton.onclick = function () {
            window.location.href = "/pages/subscriptions.html";
        }
        try {
            const dataSubscription = {
                user_id: window.localStorage.getItem("userId"),
                event_id: eventId,
            };
            const response = await fetch("http://localhost:8080/subscription/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(dataSubscription),
            });
            if (!response.ok) {
                throw new Error('Erro ao realizar inscrição');
            }
        } catch (error) {
            console.error('Erro ao realizar inscrição:', error);
        }
    }

    registerButton.onclick = function () {
        window.location.href = "/pages/register.html";
    }

}

async function fetchEvents() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Erro ao buscar eventos');
        }
        const data = await response.json();
        allEvents = data.events;
        renderEvents(data.events);
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        document.getElementById('events').innerHTML = '<p>Erro ao carregar eventos.</p>';
    }
}

function renderEvents(events) {
    const container = document.getElementById('events');
    container.innerHTML = '';

    if (events.length === 0) {
        container.innerHTML = '<p>Nenhum evento encontrado.</p>';
        return;
    }

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
            <button class="card-button" data-event-id="${event.id}">Inscrever-se</button>
            </div>
        </div>
        `;

        container.appendChild(card);
    });
    const cardButtons = document.querySelectorAll('.card-button');
    cardButtons.forEach(button => {
        const eventId = button.getAttribute('data-event-id');
        button.addEventListener("click", function () {
            showConfirmationModal(eventId)
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