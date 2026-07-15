async function comparePlayers(){

    const player1=document
        .getElementById("player1-tag")
        .value
        .trim()
        .replace("#","");

    const player2=document
        .getElementById("player2-tag")
        .value
        .trim()
        .replace("#","");

    if(!player1||!player2){

        alert("Enter both player tags");

        return;

    }

    console.log(player1);

    console.log(player2);

}
