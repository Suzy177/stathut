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

        const history1 = await fetchHistory(tag1);

        const history2 = await fetchHistory(tag2);

        renderComparison(

        player1,
        
        player2
        
        );

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

async function fetchHistory(tag) {

    const response = await fetch(

        `https://api.stathut.in/api/history/${tag}`

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

            <p>🏰 TH${player1.townHall}</p>

            <p>🏆 ${player1.trophies}</p>

            <p>${player1.clan}</p>

            <p>⭐ XP ${player1.expLevel}</p>

            <p>⚔️ ${player1.warStars} War Stars</p>
    
            <p>🎁 ${player1.donations} Donations</p>

        </div>

        <div class="vs-big">

            VS

        </div>

        <div class="player-preview">

            <h2>${player2.name}</h2>

            <p>🏰 TH${player2.townHall}</p>

            <p>🏆 ${player2.trophies}</p>

            <p>${player2.clan}</p>

            <p>⭐ XP ${player2.expLevel}</p>

            <p>⚔️ ${player2.warStars} War Stars</p>
    
            <p>🎁 ${player2.donations} Donations</p>

        </div>

    </div>

    <div class="comparison-overview">

        <h2>
    
            📊 Overview Comparison
    
        </h2>
    
        <div id="overview-bars">
    
        </div>
    
    </div>

    `;

    renderOverviewBars(

        player1,
    
        player2
    
    );

}

function renderOverviewBars(player1, player2){

    const overview = document.getElementById(

        "overview-bars"

    );

    overview.innerHTML = `

        ${comparisonBar(

            "🏆 Trophies",

            player1.trophies,

            player2.trophies

        )}

        ${comparisonBar(

            "⚔ War Stars",

            player1.warStars,

            player2.warStars

        )}

        ${comparisonBar(

            "🎁 Donations",

            player1.donations,

            player2.donations

        )}

        ${comparisonBar(

            "⭐ XP",

            player1.expLevel,

            player2.expLevel

        )}

        ${comparisonBar(

            "🛠 Builder",

            player1.builderBaseTrophies,

            player2.builderBaseTrophies

        )}

    `;

}

function comparisonBar(

    title,

    value1,

    value2

){

    const max = Math.max(

        value1,

        value2,

        1

    );

    return `

        <div class="stat-card">

            <h3>${title}</h3>

            <div class="bar-row">

                <span>${value1}</span>

                <div class="bar">

                    <div

                        class="fill blue"

                        style="width:${(value1/max)*100}%">

                    </div>

                </div>

            </div>

            <div class="bar-row">

                <span>${value2}</span>

                <div class="bar">

                    <div

                        class="fill green"

                        style="width:${(value2/max)*100}%">

                    </div>

                </div>

            </div>

        </div>

    `;

}

function createComparisonChart(

canvasId,

labels,

data1,

data2,

title,

color1,

color2

){

    const canvas = document.getElementById(canvasId);

    console.log(canvasId, canvas);

    if(!canvas) return;

    if(canvas.chart){

        canvas.chart.destroy();

    }

    canvas.chart = new Chart(

        canvas,

        {

            type:"line",

            data:{

                labels,

                datasets:[

                    {

                        label:title,

                        data:data1,

                        borderColor:color1,

                        tension:.4,

                        fill:false

                    },

                    {

                        label:title,

                        data:data2,

                        borderColor:color2,

                        tension:.4,

                        fill:false

                    }

                ]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false

            }

        }

    );

}



    
