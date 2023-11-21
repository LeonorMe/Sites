function makeTableHead(table) {
  let keys = JSON.parse(localStorage.getItem(localStorage.getItem("userId")));
  let header = table.createTHead();
  let row = header.insertRow();

  let th = document.createElement("th");
  th.appendChild(document.createTextNode("User"));
  row.appendChild(th);

  for (const key in keys) {
    th = document.createElement("th");
    text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function makeTableRows(table) {
  for (const userId in localStorage) {
    userData = localStorage.getItem(userId);
    if (userData == null || userId == "userId") continue;
    parsedUserData = JSON.parse(userData);
    console.log(parsedUserData);
    let row = table.insertRow();
    let td = document.createElement("td");
    td.appendChild(document.createTextNode(userId));
    row.appendChild(td);
    for (const value in parsedUserData) {
      let td = document.createElement("td");

      if (parsedUserData[value] == "") text = document.createTextNode("---");
      else text = document.createTextNode(parsedUserData[value]);
      td.appendChild(text);
      row.appendChild(td);
    }
  }
}

function makeDataTable() {
  let table = document.querySelector("table") || document.createElement("table");
  makeTableHead(table);
  makeTableRows(table);
}

window.onload = makeDataTable();
