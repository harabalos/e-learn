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
            if (password.length < 8) { // Αυξάνουμε το ελάχιστο μήκος για καλύτερη ασφάλεια
                showError("password", "Ο κωδικός πρέπει να είναι τουλάχιστον 8 χαρακτήρες.");
                isValid = false;
            } else if (!/[A-Z]/.test(password)) { // Έλεγχος για τουλάχιστον έναν κεφαλαίο
                showError("password", "Ο κωδικός πρέπει να περιέχει τουλάχιστον έναν κεφαλαίο χαρακτήρα.");
                isValid = false;
            } else if (!/[a-z]/.test(password)) { // Έλεγχος για τουλάχιστον έναν πεζό
                showError("password", "Ο κωδικός πρέπει να περιέχει τουλάχιστον έναν πεζό χαρακτήρα.");
                isValid = false;
            } else if (!/\d/.test(password)) { // Έλεγχος για τουλάχιστον έναν αριθμό
                showError("password", "Ο κωδικός πρέπει να περιέχει τουλάχιστον έναν αριθμό.");
                isValid = false;
            }

            // Έλεγχος Ταύτισης Κωδικών
            if (password !== confirmPassword) {
                showError("confirm-password", "Οι κωδικοί δεν ταιριάζουν.");
                isValid = false;
            }

            // 4. Αν όλα είναι έγκυρα -> Αποθήκευση & Εμφάνιση
            // Τώρα θα εμφανίσουμε σύνοψη για επιβεβαίωση πριν την τελική "αποθήκευση"
            if (isValid) {
                const user = {
                    fullname: fullname,
                    email: email,
                    // Για τη σύνοψη, μπορούμε να συμπεριλάβουμε τον κωδικό (μασκαρισμένο)
                    // Σε πραγματική εφαρμογή, δεν θα τον εμφανίζαμε ποτέ.
                    password: password, 
                    // Εδώ θα προσθέτατε και τα άλλα πεδία της φόρμας (ενδιαφέροντα, ηλικία, κλπ.)
                    // π.χ. interests: getSelectedInterests(),
                    //      dob: document.getElementById("dob").value,
                };

                // Κρύβουμε τη φόρμα και εμφανίζουμε τη σύνοψη
                form.style.display = "none";
                msgContainer.innerHTML = `
                    <div class="confirmation-box">
                        <h3>Επιβεβαίωση Στοιχείων Εγγραφής</h3>
                        <p>Παρακαλώ ελέγξτε τα στοιχεία σας πριν την οριστική εγγραφή:</p>
                        <ul>
                            <li><strong>Πλήρες Όνομα:</strong> ${user.fullname}</li>
                            <li><strong>Email:</strong> ${user.email}</li>
                            <li><strong>Κωδικός:</strong> ${'*'.repeat(user.password.length)} (Επιτυχής εισαγωγή)</li>
                            <!-- Εδώ θα προσθέτατε και τα άλλα στοιχεία για επιβεβαίωση -->
                        </ul>
                        <div class="confirmation-actions">
                            <button type="button" id="confirm-registration" class="btn btn-primary">Επιβεβαίωση & Εγγραφή</button>
                            <button type="button" id="edit-registration" class="btn btn-secondary">Επεξεργασία</button>
                        </div>
                    </div>
                `;

                // Προσθήκη event listeners για τα κουμπιά επιβεβαίωσης/επεξεργασίας
                document.getElementById("confirm-registration").addEventListener("click", () => {
                    // Τελική αποθήκευση στο LocalStorage (Simulation Database)
                    const finalUser = {
                        fullname: user.fullname,
                        email: user.email,
                        // Δεν αποθηκεύουμε κωδικούς σε plain text σε real app!
                        // Εδώ αποθηκεύουμε μόνο τα μη ευαίσθητα δεδομένα.
                        joined: new Date().toLocaleDateString(),
                        // Προσθέστε και τα άλλα πεδία που θέλετε να αποθηκεύσετε μόνιμα
                    };
                    localStorage.setItem("elearning_user", JSON.stringify(finalUser));

                    // Εμφάνιση μηνύματος επιτυχίας
                    msgContainer.innerHTML = `
                        <div class="success-box">
                            <h3>🎉 Επιτυχής Εγγραφή!</h3>
                            <p>Καλώς ήρθατε, <strong>${finalUser.fullname}</strong>.</p>
                            <p>Τα στοιχεία σας αποθηκεύτηκαν τοπικά στον browser.</p>
                            <a href="index.html" class="btn">Επιστροφή στην Αρχική</a>
                        </div>
                    `;
                });

                document.getElementById("edit-registration").addEventListener("click", () => {
                    // Εμφανίζουμε ξανά τη φόρμα και καθαρίζουμε τη σύνοψη
                    form.style.display = "block";
                    msgContainer.innerHTML = ""; // Καθαρίζουμε τη σύνοψη
                    // Προαιρετικά: Προσυμπληρώνουμε τα πεδία της φόρμας με τα υπάρχοντα στοιχεία
                    document.getElementById("fullname").value = user.fullname;
                    document.getElementById("email").value = user.email;
                    document.getElementById("password").value = user.password;
                    document.getElementById("confirm-password").value = user.password;
                    clearErrors(); // Καθαρίζουμε τυχόν παλιά σφάλματα
                });
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