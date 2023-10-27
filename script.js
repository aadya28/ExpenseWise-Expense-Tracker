function redirectToIndex() {
    window.location.href = 'index.html';
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("expense-form");
    const tableBody = document.getElementById("expense-table-body");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const titleInput = form.querySelector('input[placeholder="Expense Title"]');
        const amountInput = form.querySelector('input[placeholder="Amount (in Rupees)"]');
        const descriptionInput = form.querySelector('input[placeholder="Expense Description (Optional)"]');

        const title = titleInput.value;
        const amount = amountInput.value;
        const description = descriptionInput.value || 'N/A'; // Using 'N/A' if description is not provided

        if (title && amount) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${title}</td>
                <td>${amount}</td>
                <td>${description}</td>
            `;
            tableBody.appendChild(newRow);
            form.reset();
        } else {
            alert("Both Title and Amount are required.");
        }

        updateTableMessage();
    });

    function updateTableMessage() {
        const rows = tableBody.getElementsByTagName("tr");
        console.log(rows.length);
        if (rows.length === 0) {
            // If there are no rows, display the message
            const messageRow = document.createElement("tr");
            messageRow.innerHTML = `
                <td colspan="3">No expenses added yet</td>
            `;
            tableBody.appendChild(messageRow);
            console.log(rows.length);
        } else {
            if (rows.length === 2 && rows[0].textContent.trim() === "No expenses added yet") {
                console.log(rows.length);
                tableBody.removeChild(rows[0]);
            }
        }
    }

    // Calling the updateTableMessage function when the page loads
    updateTableMessage();
});
