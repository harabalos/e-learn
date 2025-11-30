document.addEventListener("DOMContentLoaded", () => {
    const coursesContainer = document.getElementById("courses-list");
    const categoryFilter = document.getElementById("category-filter");
    const levelFilter = document.getElementById("level-filter");
    const searchInput = document.getElementById("search-input");

    if (typeof coursesData !== 'undefined' && coursesContainer) {
        renderCourses(coursesData, coursesContainer);

        const filterHandler = () => {
            const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
            const selectedLevel = levelFilter ? levelFilter.value : 'all';
            const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';

            const filteredCourses = coursesData.filter(course => {
                const matchCategory = (selectedCategory === 'all') || (course.category === selectedCategory);
                const matchLevel = (selectedLevel === 'all') || (course.level === selectedLevel);
                const matchSearch = course.title.toLowerCase().includes(searchText);
                return matchCategory && matchLevel && matchSearch;
            });
            renderCourses(filteredCourses, coursesContainer);
        };

        if (categoryFilter) categoryFilter.addEventListener("change", filterHandler);
        if (levelFilter) levelFilter.addEventListener("change", filterHandler);
        if (searchInput) searchInput.addEventListener("input", filterHandler);
    }

    const booksContainer = document.getElementById("books-list");
    if (typeof booksData !== 'undefined' && booksContainer) {
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
                        <button class="btn btn-buy" data-title="${book.title}">Αγορά</button>
                    </div>
                </article>
            `;
        });

        booksContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-buy')) {
                const bookTitle = e.target.getAttribute('data-title');
                alert(`Το βιβλίο "${bookTitle}" προστέθηκε στο καλάθι!`);
            }
        });
    }
    const videosContainer = document.getElementById("videos-list");
    // Ελέγχουμε αν υπάρχει ο container (είμαστε στη σελίδα videos.html) και τα δεδομένα
    if (typeof videosData !== 'undefined' && videosContainer) {
        videosData.forEach(video => {
            videosContainer.innerHTML += `
                <article class="course-card">
                    <!-- Responsive Video Embed Container -->
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000;">
                        <iframe 
                            src="${video.url}" 
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
                            title="${video.title}"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div class="course-content">
                        <div class="course-meta">
                            <span class="category">🎥 ${video.category}</span>
                        </div>
                        <h3>${video.title}</h3>
                        <p class="course-desc">${video.desc}</p>
                    </div>
                </article>
            `;
        });
    }
});


function renderCourses(courses, container) {
    container.innerHTML = "";
    if (courses.length === 0) {
        container.innerHTML = "<p>Δεν βρέθηκαν αποτελέσματα.</p>";
        return;
    }
    courses.forEach(course => {
        const courseHTML = `
            <article class="course-card">
                <img 
                    src="${course.image}" 
                    srcset="${course.image} 400w, ${course.image} 800w" 
                    sizes="(max-width: 600px) 100vw, 400px"
                    alt="${course.title}">
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