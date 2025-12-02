document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");
    const container = document.getElementById("course-details-container");

    if (!idParam) {
        container.innerHTML = "<p>Δεν επιλέχθηκε μάθημα. <a href='courses.html'>Επιστροφή</a></p>";
        return;
    }

    const courseId = parseInt(idParam);
    const course = coursesData.find(c => c.id === courseId);

    if (course) {
        const imgSrc = course.image || 'assets/img/banner.jpg';
        
        container.innerHTML = `
            <div class="details-header">
                <span class="category-badge">${course.category}</span>
                <h1>${course.title}</h1>
            </div>
            
            <div class="details-body">
                <img 
                    src="${imgSrc}" 
                    srcset="${imgSrc} 500w, ${imgSrc} 1000w" 
                    sizes="(max-width: 768px) 100vw, 800px"
                    alt="${course.title}">
                
                <div class="meta-info">
                    <p><strong>Επίπεδο:</strong> ${course.level}</p>
                    <p><strong>ID Μαθήματος:</strong> ${course.id}</p>
                </div>

                <div class="description">
                    <h3>Περιγραφή Μαθήματος</h3>
                    <p>${course.desc}</p>
                </div>

                <div class="actions">
                    <a href="register.html" class="btn btn-large">Εγγραφή τώρα</a>
                    <a href="courses.html" class="btn btn-secondary">Πίσω στη Λίστα</a>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `<h2>Το μάθημα δεν βρέθηκε.</h2><a href="courses.html" class="btn">Επιστροφή</a>`;
    }
});