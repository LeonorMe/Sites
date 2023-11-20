validateForm1(){
  let form = document.getElementById("form1");

  // costum validation
  document.getElementById("form1").addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    form.classList.add("was-validated");
  });
  document.getElementById("continuar-2").addEventListener("click", function () {
  document.getElementById("p4").addEventListener("click", function () {
    document.getElementById("preferencia-1")
  });
});

  let formIsValid = form.checkValidity();
  if (formIsValid) {
    let formData = new FormData(form);
    let data = {};
    for (let pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }
    localStorage.setItem("form1", JSON.stringify(data));
    // go to /PCMsites/TP3/questionnaire_p1.html
    window.location.href = "PCMsites/TP3/questionnaire_p1.html";
  }
}

// validation dropdwon?
<label for="primeiro">Opção 1</label>
<select id="primeiro" name="q4o1" onchange="checkBrowser(this)"
required>
 <option value="">Selecione uma opção</option>
 <option value="0">Chrome</option>
 <option value="1">Firefox</option>
 <option value="2">Internet Explorer</option>
 <option value="3">Opera</option>
 <option value="4">Safari</option>
</select>


function checkBrowser(elemento) {
 let opcao1 = document.getElementById("primeiro");
 let opcao2 = document.getElementById("segundo");
 let opcao3 = document.getElementById("terceiro");
 if ((elemento.id.localeCompare("primeiro") !== 0) && (elemento.value ===
opcao1.value)){
 opcao1.value= "";
 }
 if ((elemento.id.localeCompare("segundo") !== 0) && (elemento.value ===
opcao2.value)){
 opcao2.value= "";
 }
 if ((elemento.id.localeCompare("terceiro") !== 0) && (elemento.value ===
opcao3.value)){
 opcao3.value= "";
 }
}



// question outros quais
function Write_Text() {
 let x = document.forms["fdpessoais"]["pimg"].value;
 if (x == "Não") {
 document.forms["fdpessoais"]["outros_pimg"].disabled =true;
 document.forms["fdpessoais"]["outros_pimg"].value="";
 } else {
 document.forms["fdpessoais"]["outros_pimg"].disabled =false;
 }
}






startQuestionnaire();
saveData1();

 document.getElementById("myBtn").onclick = displayDate;
 function displayDate() {
   document.getElementById("demo").innerHTML = Date();
 }

 element.addEventListener(click, function, false);

 document.getElementById("myBtn").addEventListener("click", displayDate); // ou removeEventListener

/*
function myDisplayer(something) {
  document.getElementById("demo").innerHTML = something;
}

function myCalculator(num1, num2, myCallback) {
  let sum = num1 + num2;
  myCallback(sum);
}


(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

*/
