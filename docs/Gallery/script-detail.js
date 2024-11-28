const TOTALids = 40;

document.addEventListener("DOMContentLoaded", function () {
    fetch("images.json")
    .then((response) => response.json())
    .then((images) => {

        let imgId = new URLSearchParams(window.location.search).get("id");
        let thisImg = images.filter((value) => {
            return value.id == imgId;
        })[0];

        if (!thisImg) {
            window.location.href = "/";
        }

        document.querySelector(".image-container img").src = thisImg.img;
        
        let description = thisImg.desc != undefined ? thisImg.desc : "";
        let name = thisImg.name != `image_${thisImg.id}` ? thisImg.name : "";
        document.querySelector(".info p").innerHTML = name + '<br>' + description;
    })
    .catch((error) => console.error("Error loading image:", error));
});

btnBack = document.querySelector('.btn-back');
btnNext = document.querySelector('.btn-next');

btnNext.addEventListener('click', () => {
    let id = new URLSearchParams(window.location.search).get("id");
    nextId = (Number(id) + 1) % TOTALids;
    btnNext.href = "detail.html?id=" + nextId;
});

btnBack.addEventListener('click', () => {
    let id = new URLSearchParams(window.location.search).get("id");
    nextId = (Number(id) - 1) % TOTALids;
    if(nextId < 0)
        nextId += TOTALids;
    btnBack.href = "detail.html?id=" + nextId;
});