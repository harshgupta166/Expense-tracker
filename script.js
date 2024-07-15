document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseDescription = document.getElementById('expense-description');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalExpense = document.getElementById('total-expense');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.description} - $${expense.amount.toFixed(2)}
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            expenseList.appendChild(li);
        });
        updateTotal();
    }

    function updateTotal() {
        const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
        totalExpense.textContent = `Total: $${total.toFixed(2)}`;
    }

    function addExpense(description, amount) {
        expenses.push({ description, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }

    function editExpense(index, description, amount) {
        expenses[index] = { description, amount };
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }

    function deleteExpense(index) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const description = expenseDescription.value.trim();
        const amount = parseFloat(expenseAmount.value.trim());
        if (description && !isNaN(amount)) {
            addExpense(description, amount);
            expenseDescription.value = '';
            expenseAmount.value = '';
        }
    });

    expenseList.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        if (event.target.classList.contains('edit-btn')) {
            const expense = expenses[index];
            expenseDescription.value = expense.description;
            expenseAmount.value = expense.amount;
            expenseList.removeChild(event.target.parentElement);
        } else if (event.target.classList.contains('delete-btn')) {
            deleteExpense(index);
        }
    });

    renderExpenses();
});
