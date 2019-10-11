




// validate transaction form

const amountField = document.querySelector("#amountField");
const feeField = document.querySelector("#feeField");
const traField = document.querySelector("#traType");
const baField = document.querySelector("#baType");


// update typing names

const accName = document.querySelector("#accountName"), clientName = document.querySelector("#clientName");


accName.addEventListener("input", e => {
    clientName.value = e.target.value;
})

function validateFee() {
    const tr = document.querySelector("#traType");
    const ba = document.querySelector("#baType");
    const traFieldVal = tr[tr.options.selectedIndex].value;
    const bankName = ba[ba.options.selectedIndex].value;

    // if the transaction type is credit

    if (parseInt(amountField.value) <= 11000 && traFieldVal == "Credit") {
        feeField.value = 100
    }
    else if (parseInt(amountField.value) <= 21000 && traFieldVal == "Credit") {
        feeField.value = 200
    }
    else if (parseInt(amountField.value) <= 40000 && traFieldVal == "Credit") {
        feeField.value = 300
    }
    else if (parseInt(amountField.value) <= 70000 && traFieldVal == "Credit") {
        feeField.value = 400
    }
    else if (parseInt(amountField.value) <= 70000 && traFieldVal == "Credit") {
        feeField.value = 500
    }
    else if (parseInt(amountField.value) <= 100000 && traFieldVal == "Credit") {
        feeField.value = 500
    }
    else if (parseInt(amountField.value) <= 150000 && traFieldVal == "Credit") {
        feeField.value = 700
    }
    else if (parseInt(amountField.value) <= 20000000000 && traFieldVal == "Credit") {
        feeField.value = 800
    }


    // if the transaction type is debit
    // check bank type

    if (traFieldVal == "Debit") {
        feeField.value = 0
    }

}

amountField.addEventListener("input", validateFee);
traField.addEventListener("input", validateFee);
baField.addEventListener("input", validateFee);


