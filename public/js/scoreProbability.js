function scoreProbability() {
    const probability = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]

    return probability[Math.floor(Math.random() * 11)];
}

export default scoreProbability