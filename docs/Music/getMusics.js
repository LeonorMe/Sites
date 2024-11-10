let musics = null;
fetch("sounds.json")
    .then((response) => response.json())
    .then((data) => {
        musics = data;
        addDataToHTML();
    });

let MusicsList = document.getElementById("musics-list");

function updateUrl(element) {
    //console.log("updateUrl " + element.value);
    let url = element.value;

    document.getElementById("current-music").setAttribute("src", url);
    //console.log("current-music " + document.getElementById("current-music").src);
}

function addDataToHTML() {
    musics.forEach((music) => {

      let newMusic = document.createElement("div");
      //newMusic.href = "index.html?id=" + music.id;
      newMusic.classList.add("music");
      newMusic.classList.add("music-" + music.genre);
      newMusic.innerHTML = `
        <img src="${music.cover}" alt="cover - ${music.name}">
        <h3>${music.name}</h3>
        <p>${music.artist}, ${music.album} ${music.year}</p>
        <button value="${music.url}" onclick="updateUrl(this)">Play</button>
        `;
      /*
        <div>
            <audio class="controls" src="${music.url}" loop>Audio Element Not Supported</audio>
            <button onclick="document.querySelector('.controls').play()">Play</button>
            <!--button onclick="document.querySelector('.controls').pause()">Pause</button-->
        </div>
        */
      // duration, lyrics, ...
      // TODO cor de fundo com genre
      // substituir controls por butao de play
      //<button>Play</button>
      MusicsList.appendChild(newMusic);
    });
}
