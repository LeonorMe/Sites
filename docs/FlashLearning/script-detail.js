const TOTALids = 4;

document.addEventListener("DOMContentLoaded", function () {
    fetch("themes.json")
    .then((response) => response.json())
    .then((themes) => {

        let Id = new URLSearchParams(window.location.search).get("id");
        var thisCards = themes.filter((value) => {
            return value.id == Id;
        })[0];

        if (!thisCards) {
            window.location.href = "/";
        }

        let docTitle = document.querySelector('head title');
        docTitle.innerHTML = thisCards.title;

        document.querySelector(".theme-title").innerHTML = thisCards.title;

        //cardId = Math.floor(Math.random() * thisCards.cards.lenght);
        cardId = 0;

        let card = document.querySelector(".card"); 
        card.innerHTML = thisCards.cards[cardId].question;

        // use display none
        card.addEventListener("click", () => {
            card.innerHTML = thisCards.cards[cardId].awser;
            card.classList.add("awser");
        });
        
        let cardAwser = document.querySelector(".card awser"); 
        card.addEventListener("click", () => {
            //cardId = Math.floor(Math.random() * thisCards.cards.lenght);
            cardId++;
            card.innerHTML = thisCards.cards[cardId].question;
            card.classList = "card";
        });

        /* Get external cards
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
        */
    })
    .catch((error) => console.error("Error loading card:", error));
});
