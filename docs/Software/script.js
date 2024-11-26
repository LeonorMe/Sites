document.addEventListener("DOMContentLoaded", function () {
    fetch("projects.json")
    .then((response) => response.json())
    .then((data) => {
        const projectsGallery = document.querySelector(".projects-container");
        
        data.forEach((p) => {
            const project = document.createElement("div");
            project.classList = "project";
            
            coverImage = document.createElement("img")
            coverImage.src = p.imageCover;
            coverImage.alt = "project cover image";

            link = document.createElement("a");
            link.href = p.link;
            link.appendChild(coverImage);

            // -----------------------------------------
            const left = document.createElement("div");
            const right = document.createElement("div");

            left.classList = "left";
            right.classList = "rigth";

            left.appendChild(link);

            right.innerHTML = `
                <h3>${p.title}</h3>
                <p><i>${p.type} - ${p.date}</i></p>
                <br>
                <p>${p.tec}</p>
                <p>${p.note}</p>
                <br>
                <a href="${p.link}">Check it out</a>
            `;

            //if(p.id%2==0){
                project.appendChild(left);
                project.appendChild(right);
            /*}
            else{
                project.appendChild(right);
                project.appendChild(left);
            }*/

            projectsGallery.appendChild(project);
        });
    })
    .catch((error) => console.error("Error loading images:", error));
});