const TOTALids = 2;

document.addEventListener("DOMContentLoaded", function () {
    fetch("books.json")
    .then((response) => response.json())
    .then((images) => {

        let imgId = new URLSearchParams(window.location.search).get("id");
        var thisBook = images.filter((value) => {
            return value.id == imgId;
        })[0];

        if (!thisBook) {
            window.location.href = "/";
        }

        let docTitle = document.querySelector('head title');
        docTitle.innerHTML = thisBook.title

        imageElement = document.querySelector(".image-container img"); //document.createElement('img')
        imageElement.src = thisBook.cover;
        imageElement.style.transition = "all .2s ease-in-out";

        imageElement.addEventListener("mouseenter", () => {
            if(thisBook != undefined && thisBook != null){
                //setTimeout(myGeeks, 500);
                imageElement.src = thisBook.backCover;
            }
        });
        imageElement.addEventListener("mouseleave", () => {
            if (thisBook != undefined && thisBook != null){
                //setTimeout(myGeeks, 500);
                imageElement.src = thisBook.cover;
            }
        });
        
        let title = thisBook.title != `image_${thisBook.id}` ? thisBook.title : "";
        let autor = thisBook.autor != null ? thisBook.autor : "";
        let description = thisBook.desc != undefined ? thisBook.desc : "";
        document.querySelector(".info p").innerHTML =
            title + "<br>" + "por " + autor + "<br><br>" + description;
        
        fetch(thisBook.pages)
        .then((res) => res.text())
        .then((text) => {
            console.log(text)
            let pagesCont = document.querySelector(".pages-container");
            let pages = document.createElement('div');
            pages.classList = 'pages';
            if(text != null && text != undefined)
                pages.innerHTML = text;
                pagesCont.appendChild(pages);
        })
        .catch((e) => console.error("Error loading text: ", e));
    })
    .catch((error) => console.error("Error loading image:", error));
});

/*
$(document).ready(function () {
    console.log($("#text").load(pages));
    //$("#text").load("/textdoc.txt");
});

jQuery(function ($) {
    console.log($("#text").load("/textdoc.txt"));
});
*/

btnBack = document.querySelector('.btn-back');
btnNext = document.querySelector('.btn-next');

btnNext.addEventListener('click', () => {
    let id = new URLSearchParams(window.location.search).get("id");
    nextId = (Number(id) - 1) % TOTALids;
    if (nextId < 0) 
        nextId += TOTALids;
    btnNext.href = "detail.html?id=" + nextId;
});

btnBack.addEventListener('click', () => {
    let id = new URLSearchParams(window.location.search).get("id");
    nextId = (Number(id) + 1) % TOTALids;
    /*
    if(nextId < 0)
        nextId += TOTALids; 
    */
    btnBack.href = "detail.html?id=" + nextId;
});

//coverImage = document.querySelector(".cover-img");
