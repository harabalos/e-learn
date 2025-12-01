document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");
    const msgContainer = document.getElementById("form-messages");

    if (form) {
        form.addEventListener("submit", (e) => {
            // 1. Σταματάμε την αυτόματη αποστολή για να κάνουμε ελέγχους
            e.preventDefault();
            
            // Καθαρίζουμε παλιά λάθη
            clearErrors();
            msgContainer.innerHTML = "";

            // 2. Συλλογή τιμών
            const fullname = document.getElementById("fullname").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            
            let isValid = true;

            // 3. Επικύρωση (Validation)
            
            // Έλεγχος Ονόματος
            if (fullname.length < 3) {
                showError("fullname", "Το όνομα πρέπει να έχει τουλάχιστον 3 χαρακτήρες.");
                isValid = false;
            }

            // Έλεγχος Email (απλό regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError("email", "Παρακαλώ εισάγετε έγκυρο email.");
                isValid = false;
            }

            // Έλεγχος Κωδικού
            if (password.length < 6) {
                showError("password", "Ο κωδικός πρέπει να είναι τουλάχιστον 6 χαρακτήρες.");
                isValid = false;
            }

            // Έλεγχος Ταύτισης Κωδικών
            if (password !== confirmPassword) {
                showError("confirm-password", "Οι κωδικοί δεν ταιριάζουν.");
                isValid = false;
            }

            // 4. Αν όλα είναι έγκυρα -> Αποθήκευση & Εμφάνιση
            if (isValid) {
                const user = {
                    fullname: fullname,
                    email: email,
                    // Δεν αποθηκεύουμε κωδικούς σε plain text σε real app, αλλά εδώ είναι simulation
                    joined: new Date().toLocaleDateString()
                };

                // Αποθήκευση στο LocalStorage (Simulation Database)
                localStorage.setItem("elearning_user", JSON.stringify(user));

                // Εμφάνιση μηνύματος επιτυχίας
                form.style.display = "none"; // Κρύβουμε τη φόρμα
                msgContainer.innerHTML = `
                    <div class="success-box">
                        <h3>🎉 Επιτυχής Εγγραφή!</h3>
                        <p>Καλώς ήρθατε, <strong>${user.fullname}</strong>.</p>
                        <p>Τα στοιχεία σας αποθηκεύτηκαν τοπικά στον browser.</p>
                        <a href="index.html" class="btn">Επιστροφή στην Αρχική</a>
                    </div>
                `;
            }
        });
    }

    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        input.classList.add("invalid");
        // Βρίσκουμε το span error-msg που είναι ακριβώς μετά το input
        // Ή αν είναι μέσα σε div, προσαρμόζουμε. Εδώ υποθέτουμε ότι υπάρχει span στο HTML.
        const errorSpan = input.parentNode.querySelector(".error-msg");
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.display = "block";
        }
    }

    function clearErrors() {
        const inputs = document.querySelectorAll(".invalid");
        inputs.forEach(input => input.classList.remove("invalid"));
        
        const msgs = document.querySelectorAll(".error-msg");
        msgs.forEach(msg => msg.style.display = "none");
    }
});