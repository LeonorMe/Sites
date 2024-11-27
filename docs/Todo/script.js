// Change website colors

const colorMode = document.querySelector(".color-mode");

// [0:background, 1:color, 2:check 3:footer 4:addBtn]
const sunColors = ["rgb(112, 155, 50)", "rgb(166, 179, 16)", "rgb(220, 184, 91)", "rgb(222, 88, 126)", "rgb(194, 236, 239)"];
const moonColors = ["rgb(44, 70, 62)", "rgb(102, 189, 195)", "rgb(221, 103, 80)", "rgb(23, 58, 145)", "rgb(174, 72, 196)"];
const redColors = ["rgb(215, 97, 64)", "rgb(209, 70, 48)", "rgb(178, 151, 90)", "rgb(85, 62, 33)", "rgb(132, 50, 45)"];
const blueColors = ["rgb(5, 193, 234)", "rgb(74, 57, 131)", "rgb(89, 201, 40)", "rgb(2, 83, 122)", "rgb(8, 37, 228)"];

function changeColors(palette) {
    const body = document.querySelector('body')
    body.style.backgroundColor = palette[0];
    body.style.color = palette[1];
    
    const checkBoxBorder = document.querySelectorAll(".check");
    checkBoxBorder.forEach(bb =>{
        bb.style.borderColor = palette[2];
    })
    
    const checkBoxFill = document.querySelectorAll(".checked");
    checkBoxFill.forEach(bf => {
        bf.style.backgroundColor = palette[2]
    })

    const footer = document.querySelector("footer");
    footer.style.backgroundColor = palette[3];

    const buttonAdd = document.getElementById("add");
    buttonAdd.style.backgroundColor = palette[4];
}

colorMode.addEventListener('click', () =>
{
    if (colorMode.id == "sun"){
        // Go to moon
        colorMode.id = "moon";
        changeColors(moonColors);
    }
    else if (colorMode.id == "moon"){
        // Go to red
        colorMode.id = "red";
        changeColors(redColors);
    }
    else if (colorMode.id == "red") {
      // Go to blue
        colorMode.id = "blue";
        changeColors(blueColors);
    }
    else if (colorMode.id == "blue") {
      // Go to sun
        colorMode.id = "sun";
        changeColors(sunColors);
    }
})


// Check and uncheck tasks

const checkButtons = document.querySelectorAll('.check');

checkButtons.forEach(button => {
    button.addEventListener('click', () => {
        const text = document.getElementById(button.name);
        
        if (button.classList == "check no-check")
        {
            button.classList = "check checked";
            text.classList = "text-checked";
        }    
        else if (button.classList == "check checked")
        {
            button.classList = "check no-check";
            text.classList = "text-no-check";
        }    
    })    
});  


// Add new task

let id=1;
let taskList = document.getElementById("task-list");

let form = document.getElementById("form-new-task");
form.addEventListener('submit', (e) =>
{
    e.preventDefault();

    let inNewTask = document.getElementById('new-task');
    if(inNewTask.value != ""){
        newTask = document.createElement("div");
        newTask.classList = "task";

        const b = document.createElement("button");
        b.classList = "check no-check";
        b.name = id;

        const t = document.createElement("p");
        t.classList = "text-no-check";
        t.id = id;
        t.innerHTML = inNewTask.value;

        b.addEventListener('click', () => {
        
            if (b.classList == "check no-check")
            {
                b.classList = "check checked";
                t.classList = "text-checked";
            }    
            else if (b.classList == "check checked")
            {
                b.classList = "check no-check";
                t.classList = "text-no-check";
            }    
        })    

        newTask.appendChild(b);
        newTask.appendChild(t);

        taskList.appendChild(newTask);

        id++;
    }    

    inNewTask.value = "";
})    
