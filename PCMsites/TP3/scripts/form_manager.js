function validateForm1(){
  let form = document.getElementById("form1");

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
