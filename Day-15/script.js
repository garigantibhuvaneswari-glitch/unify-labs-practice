let masterPIN = "9999";
let balance = 1000;
const UNIT_PRICE = 50;
const secretWord = "matrix";

function print(message) {
    document.getElementById("output").innerText += message + "\n";
}

function bootSystem() {

    let attempts = 3;
    let loggedIn = false;
    document.getElementById("output").innerText = "";

    while (attempts > 0) {

        let inputPIN = prompt("ENTER MASTER PIN:");

        if (inputPIN === masterPIN) {
            loggedIn = true;
            break;
        } else {
            attempts--;
            alert("ACCESS DENIED! Attempts Left: " + attempts);
        }
    }

    if (!loggedIn) {
        print("SYSTEM SELF-DESTRUCT INITIATED 💥");
        return;
    }

    let banner =
    "=============================\n" +
    "  Welcome to Virtual Core   \n" +
    "          v1.0              \n" +
    "=============================";

    print(banner);

    while (true) {

        let command = prompt("[V-CORE]> Type command: (bank, shop, vault, exit)");

        switch (command) {

            case "bank":

                while (true) {

                    let bankCommand = prompt("BANK MODULE: (deposit, withdraw, balance, back)");

                    if (bankCommand === "deposit") {

                        let amount = parseFloat(prompt("Enter deposit amount:"));
                        balance += amount;
                        print("Deposited! Balance: ₹" + balance);

                    } else if (bankCommand === "withdraw") {

                        let amount = parseFloat(prompt("Enter withdraw amount:"));

                        if (amount > balance) {
                            print("❌ INSUFFICIENT FUNDS");
                        } else {
                            balance -= amount;
                            print("Withdraw Successful! Balance: ₹" + balance);
                        }

                    } else if (bankCommand === "balance") {
                        print("Current Balance: ₹" + balance);

                    } else if (bankCommand === "back") {
                        break;

                    } else {
                        print("Invalid Bank Command");
                    }
                }
                break;

            case "shop":

                let quantity = parseInt(prompt("Enter Quantity:"));
                let discount = 0;

                if (quantity >= 0 && quantity <= 5) {
                    discount = 0;
                }
                else if (quantity >= 6 && quantity <= 10) {
                    discount = 0.10;
                }
                else if (quantity >= 11) {
                    discount = 0.20;
                }

                let total = quantity * UNIT_PRICE;
                let finalPrice = total - (total * discount);

                if (finalPrice > balance) {
                    print("❌ Not enough Bank Balance!");
                } else {
                    balance -= finalPrice;
                    print(
                        "Items: " + quantity +
                        "\nDiscount: " + (discount * 100) + "%" +
                        "\nFinal Price: ₹" + finalPrice +
                        "\nRemaining Balance: ₹" + balance
                    );
                }
                break;

            case "vault":

                print("Hint: Famous sci-fi virtual world movie.");
                let guess = prompt("Enter Secret Word:");

                if (guess === secretWord) {
                    print("🔓 ACCESS GRANTED");
                    print("Secret Message: You unlocked the hidden layer!");
                } else {
                    print("Wrong Word! Returning to Main Menu.");
                }
                break;

            case "exit":
                print("Shutting Down Virtual Core...");
                return;

            default:
                print("Unknown Command");
        }
    }
}
