const week = document.querySelector("weekHolder");

function marquee(winner) {

    if (winner == 404) {
        const final = `
        <marquee class="marquee">
            <p class="text-success"> There are no winners <span class="text-warning">(N)${winner.potWin}</span>:
            ${winner.name.toUpperCase()}.
            </p>
        </marquee>
        `;

        document.querySelector(".footer").innerHTML = final;
        return;
    }

    const final = `
    <marquee class="marquee">
        <p class="text-success">Congratulations to the winner of week ${week.innerText} <span class="text-warning">(N)${winner.potWin}</span>:
        ${winner.name.toUpperCase()}.
        </p>
    </marquee>
    `;

    document.querySelector(".footer").innerHTML = final;
}

export default marquee;