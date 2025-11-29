
document.addEventListener("DOMContentLoaded", () => {
    const coursesContainer = document.getElementById("courses-list");
    const categoryFilter = document.getElementById("category-filter");
    const levelFilter = document.getElementById("level-filter");

    if (typeof coursesData !== 'undefined' && coursesContainer) {
        
        renderCourses(coursesData, coursesContainer);

        if (categoryFilter && levelFilter) {
            
            const filterHandler = () => {
                const selectedCategory = categoryFilter.value;
                const selectedLevel = levelFilter.value;

                //Φιλτράρισμα του coursesData
                const filteredCourses = coursesData.filter(course => {
                    const matchCategory = (selectedCategory === 'all') || (course.category === selectedCategory);
                    const matchLevel = (selectedLevel === 'all') || (course.level === selectedLevel);

                    return matchCategory && matchLevel;
                });

                renderCourses(filteredCourses, coursesContainer);
            };

            categoryFilter.addEventListener("change", filterHandler);
            levelFilter.addEventListener("change", filterHandler);
        }
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