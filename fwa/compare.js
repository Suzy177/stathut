async function comparePlayers() {

    const tag1 = document
        .getElementById("player1-tag")
        .value
        .trim()
        .replace("#", "");

    const tag2 = document
        .getElementById("player2-tag")
        .value
        .trim()
        .replace("#", "");

    if (!tag1 || !tag2) {

        alert("Enter both player tags");

        return;

    }

    try {

        const player1 = await fetchPlayer(tag1);

        const player2 = await fetchPlayer(tag2);

        renderComparison(player1, player2);

    }

    catch (err) {

        console.error(err);

        alert("Unable to load players.");

    }

}

async function fetchPlayer(tag) {

    const response = await fetch(

        `https://api.stathut.in/api/player/${tag}`

    );

    return await response.json();

}

function renderComparison(player1, player2) {

    console.log(player1);

    console.log(player2);

    const results = document.getElementById("comparison-results");

    results.style.display = "block";

    results.innerHTML = `

    <div class="comparison-header">

        <div class="player-preview">

            <h2>${player1.name}</h2>

            <p>🏰 TH${player1.townHallLevel}</p>

            <p>🏆 ${player1.trophies}</p>

            <p>${player1.clan?.name || "No Clan"}</p>

        </div>

        <div class="vs-big">

            VS

        </div>

        <div class="player-preview">

            <h2>${player2.name}</h2>

            <p>🏰 TH${player2.townHallLevel}</p>

            <p>🏆 ${player2.trophies}</p>

            <p>${player2.clan?.name || "No Clan"}</p>

        </div>

    </div>

    `;

}

    
