const COHORT = '2410-ftb-et-web-am';
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    parties: [],
}

async function getParties() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.artists = json.data
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
        parties.innerHTML = '<li>No Parties...</li>';
    }

    const partyCard = state.parties.map((party) => {
        const card = document.createElement('li');
        card.innerHTML = `
        <h2>${party.}'</h2>
        <img src='${}' alt='${}'
        `
    })
}
