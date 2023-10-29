function redirectToIndex() {
    window.location.href = 'expenses.html';
}

document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.getElementById("expense-form");
    if (expenseForm) {
        const tableBody = document.getElementById("expense-table-body");

        expenseForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const titleInput = expenseForm.querySelector('input[placeholder="Expense Title"]');
            const amountInput = expenseForm.querySelector('input[placeholder="Amount (in Rupees)"]');
            const descriptionInput = expenseForm.querySelector('input[placeholder="Expense Description (Optional)"]');

            const title = titleInput.value;
            const amount = amountInput.value;
            const description = descriptionInput.value || 'N/A'; // Using "N/A" if description is not provided

            if (title && amount) {
                // Get the current date and time
                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString();
                const formattedTime = currentDate.toLocaleTimeString();

                // Create a new row for the expense
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <td>${title}</td>
                    <td>${amount}</td>
                    <td>${description}</td>
                    <td>${formattedDate}</td>
                    <td>${formattedTime}</td>
                `;
                tableBody.appendChild(newRow);
                expenseForm.reset();
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
                <td colspan="5">No expenses added yet</td>
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
    }

    const categoryForm = document.getElementById("category-form");
    if (categoryForm) {
        const categoryNameInput = document.getElementById("category-name");
        const generateRandomColorButton = document.getElementById("generate-random-color");
        const categoryColorInput = document.getElementById("category-color-input");
        const categoryList = document.getElementById("category-list");

        generateRandomColorButton.addEventListener("click", function () {
            // Generate a random color and ensure it's unique
            let randomColor;
            do {
                randomColor = getRandomColor();
            } while (isColorAlreadyUsed(randomColor));

            // Set the value of the color input to the generated color's hex code
            categoryColorInput.value = randomColor;

            // Set the button's background color to the generated color
            generateRandomColorButton.style.backgroundColor = randomColor;
        });

        categoryColorInput.addEventListener("input", function () {
            // Set the button's background color to the input value
            generateRandomColorButton.style.backgroundColor = categoryColorInput.value;
        });

        categoryForm.addEventListener("reset", function (event) {
            generateRandomColorButton.style.backgroundColor = "white";
        });

        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        function isColorAlreadyUsed(color) {
            // You can implement a check to see if the color is already used in the category list
            const categoryBoxes = document.querySelectorAll(".category-box");
            for (const box of categoryBoxes) {
                if (box.style.backgroundColor === color) {
                    return true;
                }
            }
            return false;
        }

        categoryForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Create a new category element
            const newCategory = document.createElement("div");
            newCategory.className = "category-box";
            newCategory.style.backgroundColor = categoryColorInput.value; // Use the selected color
            newCategory.innerHTML = `
            <h3>${categoryNameInput.value}</h3>
            `;

            // Append the new category to the category list
            categoryList.appendChild(newCategory);

            // Clear the inputs
            categoryNameInput.value = "";
            categoryColorInput.value = "";
        });
    }

});