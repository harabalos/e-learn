document.addEventListener("DOMContentLoaded", () => {
    const coursesContainer = document.getElementById("courses-list");
    const categoryFilter = document.getElementById("category-filter");
    const levelFilter = document.getElementById("level-filter");
    const searchInput = document.getElementById("search-input"); // Input αναζήτησης

    // Έλεγχος αν υπάρχουν τα δεδομένα και το container των μαθημάτων
    if (typeof coursesData !== 'undefined' && coursesContainer) {
        
        // 1. Αρχική εμφάνιση όλων των μαθημάτων
        renderCourses(coursesData, coursesContainer);

        // 2. Συνάρτηση που τρέχει κάθε φορά που αλλάζει κάποιο φίλτρο
        const filterHandler = () => {
            // Διάβασμα τιμών (αν υπάρχουν τα στοιχεία, αλλιώς default)
            const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
            const selectedLevel = levelFilter ? levelFilter.value : 'all';
            const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';

            // Φιλτράρισμα του πίνακα coursesData
            const filteredCourses = coursesData.filter(course => {
                // Έλεγχος Κατηγορίας
                const matchCategory = (selectedCategory === 'all') || (course.category === selectedCategory);
                // Έλεγχος Επιπέδου
                const matchLevel = (selectedLevel === 'all') || (course.level === selectedLevel);
                // Έλεγχος Αναζήτησης (στον τίτλο)
                const matchSearch = course.title.toLowerCase().includes(searchText);

                // Πρέπει να ισχύουν ΟΛΑ (AND logic)
                return matchCategory && matchLevel && matchSearch;
            });

            // Εμφάνιση των φιλτραρισμένων
            renderCourses(filteredCourses, coursesContainer);
        };

        // 3. Σύνδεση με τα Events
        if (categoryFilter) categoryFilter.addEventListener("change", filterHandler);
        if (levelFilter) levelFilter.addEventListener("change", filterHandler);
        if (searchInput) searchInput.addEventListener("input", filterHandler);
    }


    const booksContainer = document.getElementById("books-list");
    
    // Έλεγχος αν υπάρχουν τα δεδομένα και το container των βιβλίων
    if (typeof booksData !== 'undefined' && booksContainer) {
        
        // 1. Δημιουργία HTML για κάθε βιβλίο
        booksData.forEach(book => {
            booksContainer.innerHTML += `
                <article class="course-card">
                    <img src="${book.image}" alt="${book.title}" style="height: 250px; object-fit: cover;">
                    <div class="course-content">
                        <div class="course-meta">
                            <span class="category">📖 ${book.category}</span>
                            <span class="level" style="font-weight: bold; color: var(--accent-color);">${book.price}</span>
                        </div>
                        <h3>${book.title}</h3>
                        <p class="course-desc">${book.desc}</p>
                        <!-- Χρήση data attribute για να ξέρουμε ποιο βιβλίο πατήθηκε -->
                        <button class="btn btn-buy" data-title="${book.title}">Αγορά</button>
                    </div>
                </article>
            `;
        });

        // 2. Event Delegation για τα κουμπιά "Αγορά"
        // (Αντί για onclick="" στο HTML, ακούμε τα κλικ στο container)
        booksContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-buy')) {
                const bookTitle = e.target.getAttribute('data-title');
                alert(`Το βιβλίο "${bookTitle}" προστέθηκε στο καλάθι!`);
            }
        });
    }
});

function renderCourses(courses, container) {
    container.innerHTML = "";

    if (courses.length === 0) {
        container.innerHTML = "<p>Δεν βρέθηκαν μαθήματα με αυτά τα κριτήρια.</p>";
        return;
    }

    courses.forEach(course => {
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
        container.innerHTML += courseHTML;
    });
}