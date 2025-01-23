const COHORT = '2410-ftb-et-web-am';
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    parties: [],
}

async function getParties() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.parties = json.data
    } catch (error) {
        console.log(error)
    }
}

async function addParties(party) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(party),
        });
        const json = await response.json();

        if (json.error) {
        throw new Error(json.error.message);
        }
    } catch (error) {
    console.error(error);
  }
}

function renderParties() {
    const partyList = document.querySelector('#parties')

    if (!state.parties.length) {
        partyList.innerHTML = '<li>No Parties...</li>';
    }

    const partyCards = state.parties.map((party) => {
        const card = document.createElement('li');
        card.innerHTML = `
        <h2>${party.name}'</h2>
        <p>${party.date}</p>
        <p>${party.time}</p>
        <p>${party.location}</p>
        <p>${party.description}</p>
        `;

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('json-id', party.id)
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async (event) => {
            await deleteParty(event.target.dataset.id)
        })
        card.appendChild(deleteButton)
        return card;
    });
    partyList.replaceChildren(...partyCards)
}

async function render() {
    await getParties();
    renderParties();
}

const form = document.querySelector('form');
form.addEventListener('submit', async (events) => {
    event.preventDefault();

    const party = {
        name: form.partyName.value,
        date: form.partyDate.value,
        time: form.partyTime.value,
        location: form.partyLocation.value,
        description: form.partyDescription.value,
    }

    await addParty(party);
    render();
});
