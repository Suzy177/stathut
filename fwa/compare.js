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

    const results = document.getElementById(
    
        "comparison-results"
    
    );
    
    results.style.display = "block";
    
    results.innerHTML = `
    `;

}

    
