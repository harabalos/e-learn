// AICANARY: CSD-ELearn-2025

document.addEventListener("DOMContentLoaded", () => {
    // 1. Παίρνουμε το ID από τη γραμμή διευθύνσεων (URL)
    // Π.χ. αν το URL είναι course-details.html?id=2, το idParam θα γίνει "2"
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");

    const container = document.getElementById("course-details-container");

    // Αν δεν υπάρχει ID στο URL, δείχνουμε μήνυμα λάθους
    if (!idParam) {
        container.innerHTML = "<p>Δεν επιλέχθηκε μάθημα. <a href='courses.html'>Επιστροφή</a></p>";
        return;
    }

    // 2. Μετατροπή του ID σε αριθμό
    const courseId = parseInt(idParam);

    // 3. Ψάχνουμε το μάθημα μέσα στον πίνακα coursesData
    // (Το coursesData υπάρχει επειδή φορτώσαμε το courses.js ΠΡΙΝ από αυτό το αρχείο στο HTML)
    const course = coursesData.find(c => c.id === courseId);

    if (course) {
        // 4. Αν βρεθεί το μάθημα, φτιάχνουμε το HTML
        container.innerHTML = `
            <div class="details-header">
                <span class="category-badge">${course.category}</span>
                <h1>${course.title}</h1>
            </div>
            
            <div class="details-body">
                <img src="${course.image || 'assets/img/banner.jpg'}" alt="${course.title}">
                
                <div class="meta-info">
                    <p><strong>Επίπεδο:</strong> ${course.level}</p>
                    <p><strong>ID Μαθήματος:</strong> ${course.id}</p>
                </div>

                <div class="description">
                    <h3>Περιγραφή Μαθήματος</h3>
                    <p>${course.desc}</p>
                    <p>
                        Σε αυτό το μάθημα θα εμβαθύνετε στις έννοιες του ${course.title}. 
                        Η ύλη έχει σχεδιαστεί για να καλύψει τις ανάγκες του σύγχρονου επαγγελματία.
                        (Αυτό είναι δείγμα κειμένου για να γεμίσει η σελίδα).
                    </p>
                </div>

                <div class="actions">
                    <a href="register.html" class="btn btn-large">Εγγραφή τώρα</a>
                    <a href="courses.html" class="btn btn-secondary">Πίσω στη Λίστα</a>
                </div>
            </div>
        `;
    } else {
        // 5. Αν δεν βρεθεί μάθημα με αυτό το ID
        container.innerHTML = `
            <h2>Το μάθημα δεν βρέθηκε.</h2>
            <p>Παρακαλώ επιστρέψτε στον κατάλογο.</p>
            <a href="courses.html" class="btn">Επιστροφή</a>
        `;
    }
});