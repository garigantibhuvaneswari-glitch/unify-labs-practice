// 1️⃣ Filter Tasks into Completed & Pending

const tasks = [
    { name: "Design Homepage", completed: true },
    { name: "Fix Bugs", completed: false },
    { name: "Deploy Website", completed: true },
    { name: "Write Documentation", completed: false }
];

function filterTasks() {

    const completed = tasks.filter(task => task.completed);
    const pending = tasks.filter(task => !task.completed);

    document.getElementById("completedTasks").innerHTML =
        "<h3>Completed Tasks:</h3>" +
        completed.map(task => task.name).join("<br>");

    document.getElementById("pendingTasks").innerHTML =
        "<h3>Pending Tasks:</h3>" +
        pending.map(task => task.name).join("<br>");
}



// 2️⃣ Map Prices with Tax Added

const prices = [100, 250, 400, 550];

function calculateTax() {

    const taxRate = 0.18;

    const pricesWithTax = prices.map(price =>
        price + (price * taxRate)
    );

    document.getElementById("priceOutput").innerHTML =
        "<h3>Prices After 18% Tax:</h3>" +
        pricesWithTax.map(price => "₹" + price.toFixed(2)).join("<br>");
}



// 3️⃣ Reduce Expenses into Total Budget

const expenses = [5000, 12000, 8000, 6500, 3000];

function calculateBudget() {

    const totalBudget = expenses.reduce((total, expense) =>
        total + expense, 0
    );

    document.getElementById("budgetOutput").innerHTML =
        "<h3>Total Company Budget:</h3> ₹" + totalBudget;
}
