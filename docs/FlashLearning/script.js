document.addEventListener("DOMContentLoaded", function () {
    fetch("themes.json")
    .then((response) => response.json())
    .then((data) => {
    const themes = document.querySelector(".themes-container");

    data.forEach((theme) => {
        let group = document.createElement("div");
        group.classList = "container";

        coverImage = document.createElement("img");
        coverImage.src = theme.cover;
        coverImage.alt = theme.title;
        coverImage.classList = "image";

        titleText = document.createElement("div");
        titleText.classList = "text";
        titleText.innerHTML = theme.title;
        
        hoverImage = document.createElement("div");
        hoverImage.classList = "overlay";
        
        hoverImage.appendChild(titleText);
        
        link = document.createElement("a");
        link.href = "detail.html?id=" + theme.id;
        
        link.appendChild(coverImage);
        link.appendChild(hoverImage);

        group.appendChild(link);

        themes.appendChild(group);
        });
    })
    .catch((error) => console.error("Error loading images:", error));
});

