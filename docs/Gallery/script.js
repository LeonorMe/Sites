document.addEventListener("DOMContentLoaded", function () {
    fetch("images.json")
    .then((response) => response.json())
    .then((data) => {
        const projectsGallery = document.querySelector(".projects-container");
        
        data.forEach((p) => {
            const project = document.createElement("div");
            project.classList = "project";
            
            coverImage = document.createElement("img")
            coverImage.src = p.img;
            coverImage.alt = p.name;

            link = document.createElement("a");
            link.href = "detail.html?id=" + p.id;
            link.appendChild(coverImage);

            project.appendChild(link);

            projectsGallery.appendChild(project);
        });
    })
    .catch((error) => console.error("Error loading images:", error));
});
