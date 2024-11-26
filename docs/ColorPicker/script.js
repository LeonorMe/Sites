const buttonChange = document.querySelector('.button-color-change');
const buttonSave = document.querySelector('.button-color-save');
const colorBoxes = document.querySelectorAll(".color-box");

function randomColor(){
    const characters = '0123456789ABCDEF';
    let color = '#';
    for (let i=0; i < 6 ; i++){
        color += characters[Math.floor(Math.random() * 15)];
    }
    return color;
}

function checkContrast(cor){
    let sum = 0;
    cor.forEach(c => {
        if(characters.indexOf(c) > 8){
            sum++;
        }
    });
    if(sum > 3){
        return 'black';
    }
    else{
        return 'white';
    }
}

buttonChange.addEventListener('click', () => {
    colorBoxes.forEach(box => {
        randColor = randomColor();
        box.style.backgroundColor = randColor;
        box.innerHTML = `
            <p style="color:white">${randColor}</p>
            <p style="color:black">${randColor}</p>
            `;
        //box.style.color = checkContrast(randColor.slice(-6));
    });
})

const saved = document.querySelector('.saved');

buttonSave.addEventListener('click', () => {
    const pallet = document.createElement('div');
    pallet.className = "pallet";
    colorBoxes.forEach((box) => {
        c = box.style.backgroundColor
        pallet.innerHTML += `
        <p style="background-color:${c}; color:${c}"><b>${c}</b></p>
        `;
    });
    saved.appendChild(pallet);
})
