document.addEventListener("DOMContentLoaded", function () {
    // Function to handle form submission with AJAX
    function handleSubmit(event) {
        event.preventDefault(); 
        const email = document.getElementById("input--email").value;
        const password = document.getElementById("input--password").value;

        // Create a new XMLHttpRequest
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:5050/doctors/login", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    if (data.success) {
                        // Redirect or perform desired action on successful login
                        window.location.href = "/dashboard";
                    } else {
                        // Display error message
                        document.getElementById("errorMessage").textContent =
                            data.message;
                    }
                } else {
                    console.error("Error:", xhr.status);
                }
            }
        };

        // Create the request body as JSON
        const requestBody = JSON.stringify({ email, password });

        // Send the request
        xhr.send(requestBody);
    }

    // Attach form submission handler
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", handleSubmit);
});
