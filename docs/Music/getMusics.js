let musics = null;
fetch("sounds.json")
    .then((response) => response.json())
    .then((data) => {
        musics = data;
        addDataToHTML();
    });

let MusicsList = document.getElementById("musics-list");

function addDataToHTML() {
    musics.forEach((music) => {
      console.log(music.name);

      let newMusic = document.createElement("div");
      //newMusic.href = "index.html?id=" + music.id;
      newMusic.classList.add("music");
      newMusic.classList.add("music-" + music.genre);
      newMusic.innerHTML = `
                <img src="${music.cover}" alt="cover - ${music.name}">
                <h3>${music.name}</h3>
                <p>${music.artist}, ${music.album} ${music.year}</p>
                <audio class="controls" src="${music.url}" loop>Audio Element Not Supported</audio>
                <div>
                    <button onclick="document.querySelector('.controls').play()">Play</button>
                    <!--button onclick="document.querySelector('.controls').pause()">Pause</button-->
                </div>
                `;
      // duration, lyrics, ...
      // TODO cor de fundo com genre
      // substituir controls por butao de play
      //<button>Play</button>
      MusicsList.appendChild(newMusic);
    });
}
