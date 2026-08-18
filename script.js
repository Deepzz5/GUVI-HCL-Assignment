let expenses = [];

function addExpense() {

    let name = document.getElementById("expenseName").value;
    let amount = Number(document.getElementById("expenseAmount").value);
    let category = document.getElementById("category").value;

    if (name == "" || amount <= 0) {
        alert("Please enter valid expense details");
        return;
    }

    let expense = {
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(expense);

    displayExpenses();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}


// Function to display expenses
function displayExpenses() {

    let list = document.getElementById("expenseList");

    list.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {

        let row = `
            <tr>
                <td>${expenses[i].name}</td>
                <td>₹${expenses[i].amount}</td>
                <td>${expenses[i].category}</td>
            </tr>
        `;

        list.innerHTML += row;
    }
}

function calculateTotalExpenses() {

    let total = 0;

    for (let i = 0; i < expenses.length; i++) {
        total = total + expenses[i].amount;
    }

    return total;
}


function calculateSavings(income, expenses) {

    let savings = income - expenses;

    return savings;
}

function categorizeExpense() {

    let categories = {
        Food: 0,
        Travel: 0,
        Education: 0,
        Shopping: 0,
        Others: 0
    };

    for (let i = 0; i < expenses.length; i++) {

        let category = expenses[i].category;

        categories[category] =
            categories[category] + expenses[i].amount;
    }

    return categories;
}

function showSummary() {

    let income = Number(document.getElementById("income").value);

    if (income <= 0) {
        alert("Please enter your income");
        return;
    }

    let totalExpenses = calculateTotalExpenses();

    let savings = calculateSavings(income, totalExpenses);

    let categories = categorizeExpense();

    let summary = document.getElementById("summary");

    summary.innerHTML = `
        <h2>Summary Report</h2>

        <p><b>Income:</b> ₹${income}</p>

        <p><b>Total Expenses:</b> ₹${totalExpenses}</p>

        <p><b>Savings:</b> ₹${savings}</p>

        <h3>Category Wise Expenses</h3>

        <p>Food: ₹${categories.Food}</p>
        <p>Travel: ₹${categories.Travel}</p>
        <p>Education: ₹${categories.Education}</p>
        <p>Shopping: ₹${categories.Shopping}</p>
        <p>Others: ₹${categories.Others}</p>
    `;
}