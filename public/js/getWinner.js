function getWinner(players) {
    const winnerName = document.querySelector(".winner");
    const potWin = document.querySelector(".potWinHTML2");
    const winner = players[0];

    winnerName.innerText = winner.name;
    potWin.innerText = winner.potWin;

    return winner[0];
}

export default getWinner;