// Questionario 1 - pergunta 4 e 5

function checkBrowser(elemento) {
  let opcao1 = document.getElementById("preferencia-1");
  let opcao2 = document.getElementById("preferencia-2");
  let opcao3 = document.getElementById("preferencia-3");

  if (
    elemento.id.localeCompare("preferencia-1") !== 0 &&
    elemento.value === opcao1.value
  ) {
    opcao1.value = "";
  }

  if (
    elemento.id.localeCompare("preferencia-2") !== 0 &&
    elemento.value === opcao2.value
  ) {
    opcao2.value = "";
  }

  if (
    elemento.id.localeCompare("preferencia-3") !== 0 &&
    elemento.value === opcao3.value
  ) {
    opcao3.value = "";
  }
}

function Write_Text() {
  let x = document.forms["fdpessoais"]["outros-sites"].value;
  if (x == "no") {
    document.forms["fdpessoais"]["outros_pimg"].disabled = true;
    document.forms["fdpessoais"]["outros_pimg"].value = "";
  } else {
    document.forms["fdpessoais"]["outros_pimg"].disabled = false;
  }
}
