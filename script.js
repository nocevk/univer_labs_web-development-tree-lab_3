document.addEventListener("DOMContentLoaded", () => {
    const helloButton = document.getElementById("hello-btn");
    const greetingDiv = document.getElementById("greeting");
    const form = document.getElementById("email-form");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const serverMessage = document.getElementById("server-message");

    // Регулярний вираз для валідації пошти [cite: 167]
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 1. Обробка простого привітання [cite: 168-171]
    if (helloButton && greetingDiv) {
        helloButton.addEventListener("click", () => {
            greetingDiv.textContent = "Привіт, користувачу!";
        });
    }

    // 2. Валідація та Fetch API [cite: 172-194]
    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); // Забороняємо перезавантаження сторінки [cite: 173]
            
            const email = emailInput.value.trim();
            emailError.textContent = "";
            serverMessage.textContent = "";

            // Клієнтська валідація [cite: 175-176]
            if (!emailRegex.test(email)) {
                emailError.textContent = "Введіть коректний email у форматі name@example.com";
                return;
            }

            try {
                // Асинхронний запит до сервера [cite: 181-192]
                const response = await fetch("/api/message", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email })
                });

                const data = await response.json();
                serverMessage.textContent = data.message;
                serverMessage.className = "mt-3 fw-semibold text-success";
            } catch (error) {
                serverMessage.textContent = "Помилка з'єднання з сервером";
                serverMessage.className = "mt-3 fw-semibold text-danger";
            }
        });
    }
});console.log("");