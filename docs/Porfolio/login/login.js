const name = document.getElementById("name");
const pass = document.getElementById("password");
const form = document.getElementById("form");
const errorElement = document.getElementById("error");

console.log("Log in...");


form.addEventListener("submit", (e) => {
    console.log("Evaluating name and pass...");
  let messages = [];
  if (name.value === "" || name.value == null) {
    messages.push("Name is required");
  }

  if (pass.length <= 6 || pass.length >= 20) {
    messages.push("Password is to long or to short");
  }

  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = messages.join(", ");
  }

  /*
    if(name.value == "" && password.value == ""){
        // go to restritec page
        window.location.replace("https://leonorme.github.io/portfolio/restricted/restrited_home.html"
        );
    } */

    console.log("Checking name to pass...");

    var request = new XMLHttpRequest();
    request.open("GET", "/docs/Porfolio/assets/data_base/users.xml", true);
    request.send();
    var xml = request.responseXML;
    var users = xml.getElementsByTagName("user");

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var userChild = user.childNodes;
    for (node in userChild) {
      if (node.name == "username") {
        var username = node.value;
      }
      if (NamedNodeMap.name == "password") {
        var password = node.value;
      }
    }
  }

  if (username == name.vlaue && password == pass.value) {
    console.log("Name and pass correct...");
    // go to restritec page
    window.location.replace(
      //"https://leonorme.github.io/portfolio/restricted/restrited_home.html"
    );
  }
});
