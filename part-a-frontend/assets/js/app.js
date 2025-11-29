// AICANARY: CSD-ELearn-2025

document.addEventListener("DOMContentLoaded", () => {
    // 1. Ελέγχουμε αν είμαστε σε σελίδα που πρέπει να δείξει μαθήματα
    // Ψάχνουμε το container με id="courses-list" (το βάλαμε στο index.html)
    const coursesContainer = document.getElementById("courses-list");

    if (coursesContainer && typeof coursesData !== 'undefined') {
        // Αν βρεθεί το container και υπάρχουν δεδομένα, καλούμε τη συνάρτηση render
        renderCourses(coursesData, coursesContainer);
    }
});

/**
 * Συνάρτηση που δημιουργεί HTML κάρτες για κάθε μάθημα
 * @param {Array} courses - Ο πίνακας με τα μαθήματα
 * @param {HTMLElement} container - Το στοιχείο HTML που θα τα βάλουμε μέσα
 */
function renderCourses(courses, container) {
    // Καθαρίζουμε τα περιεχόμενα (για ασφάλεια)
    container.innerHTML = "";

    // Για κάθε μάθημα στον πίνακα...
    courses.forEach(course => {
        // Δημιουργούμε ένα HTML string για την κάρτα
        // Χρησιμοποιούμε Template Literals (με τα backticks ` `)
        const courseHTML = `
            <article class="course-card">
                <img src="${course.image}" alt="${course.title}">
                <div class="course-content">
                    <div class="course-meta">
                        <span class="category">📂 ${course.category}</span>
                        <span class="level">📊 ${course.level}</span>
                    </div>
                    <h3>${course.title}</h3>
                    <p class="course-desc">${course.desc}</p>
                    <a href="course-details.html?id=${course.id}" class="btn">Δείτε περισσότερα</a>
                </div>
            </article>
        `;

        // Προσθέτουμε το HTML στο container
        container.innerHTML += courseHTML;
    });
}