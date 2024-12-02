document.addEventListener("DOMContentLoaded", function () {
    fetch("books.json")
    .then((response) => response.json())
    .then((data) => {
        const projectsGallery = document.querySelector(".projects-container");
        
        data.forEach((p) => {
            const project = document.createElement("div");
            project.classList = "project";
            
            coverImage = document.createElement("img")
            coverImage.src = p.cover;
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

var activeColor = "rgb(166, 129, 28)";

function randColor(){
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgba(${red}, ${green}, ${blue}, 0.5)`;
}

let changeColor = document.querySelector(".change-color");
changeColor.addEventListener('click', ()=>{
    activeColor = randColor();
    changeColor.style.backgroundColor = activeColor;
})

/*
document.addEventListener('click', (e) => {
    //console.log("mouse location:", e.clientX, e.clientY);
    // TODO
})*/

document.onmousemove = function (e) {
    draw(e);
};

function draw(e){
    _Xpos = e.clientY;
    _Ypos = e.clientX;

    const elem = document.createElement("div");
    elem.classList = "mouse-animation";
    elem.style.boxShadow = `0px 0px 2px 2px ${activeColor}`;
    elem.style.top = _Xpos + "px";
    elem.style.left = _Ypos + "px";
    
    document.querySelector("body").appendChild(elem);
    
    setTimeout(() => {
        elem.style.opacity = '0.75';
    }, "150");

    setTimeout(() => {
        elem.style.opacity = "0.5";
    }, "150");

    setTimeout(() => {
        elem.style.opacity = "0.25";
    }, "150");

    setTimeout(() => {
        elem.remove();
    }, "250");
}
