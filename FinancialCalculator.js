document.addEventListener("DOMContentLoaded", () => {
    const creditAmount = document.getElementById("creditAmount");
    const interestRate = document.getElementById("interestRate");
    const creditTerm = document.getElementById("creditTerm");

    const familyIncome = document.getElementById("familyIncome");
    const numberOfFamilyMembers = document.getElementById("numberOfFamilyMembers");
    const communalPayments = document.getElementById("communalPayments");

    const gettingResult = document.getElementById("gettingResult");
    const clearingResult = document.getElementById("clearingResult");

    let result = document.createElement("div");
    result.id = "result";

    gettingResult.addEventListener("click", () => {
        creditCheck();
    });

    clearingResult.addEventListener("click", () => {
        clearResult();
    });

    function creditCheck() {
        removeResultDiv();

        const livingWage = 12284; // прожиточный минимум по Новосибирской области
        const familyBudget = Number(familyIncome.value) - (Number(communalPayments.value) + Number(livingWage * numberOfFamilyMembers.value));
        const creditBody = Number(creditAmount.value) / Number(creditTerm.value);

        if (familyBudget < creditBody) {
            result.innerHTML = "<h3 id='warning'>К сожалению, Вы не можете взять кредит на данную сумму</h3>";
            document.body.append(result);
        } else {
            if (creditAmount.value !== "" && interestRate.value !== "" && creditTerm.value !== "" &&
                familyIncome.value !== "" && numberOfFamilyMembers.value !== "" && communalPayments.value !== "") {
                getResult();
            }
        }
    }

    function getResult() {
        removeResultDiv();

        let amount = Number(creditAmount.value);
        let period = Number(creditTerm.value);
        let rate = Number(interestRate.value) / 100 / 12;

        let differentiatedPayment = 0;
        let percents = 0;
        let remainingAmount = amount;
        let balanceOwed = Number(amount / period).toFixed(2);

        let str = "<table><tr id='columnHeader'><th id=\"number\">№</th><th>Платеж</th><th>Проценты</th><th>Тело кредита</th><th>Остаток</th></tr>";

        for (let i = 0; i < period; i++) {
            percents = Number(remainingAmount * rate).toFixed(2);
            remainingAmount = Number(remainingAmount - balanceOwed).toFixed(2);
            differentiatedPayment = Number(percents) + Number(balanceOwed);
            str += `<tr>
                <td id="number">${i + 1}</td>
                <td>${differentiatedPayment}</td>
                <td>${percents}</td>
                <td>${balanceOwed}</td>
                <td>${remainingAmount}</td>
            </tr>`;
        }

        str += "</table>";
        result.innerHTML = str;
        document.body.append(result);
    }

    function clearResult() {
        creditAmount.value = "";
        interestRate.value = "";
        creditTerm.value = "";
        familyIncome.value = "";
        numberOfFamilyMembers.value = "";
        communalPayments.value = "";

        document.getElementById("result").remove();
    }

    function removeResultDiv() {
        if (document.getElementById("result")) {
            document.getElementById("result").remove();
        }
    }
});