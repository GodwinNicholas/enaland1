function marquee(winner) {

    const final = `
    <marquee class="marquee">
        <p class="text-success">Congratulations to the winner of week 1 <span class="text-warning">(N)${winner.potWin}</span>:
        ${winner.name.toUpperCase()}.
        </p>
    </marquee>
    `;

    document.querySelector(".footer").innerHTML = final;
}

export default marquee;