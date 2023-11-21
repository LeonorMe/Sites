function generateNewID(){
    localStorage.setItem("userID", crypto.randomUUID())
}

const form_p1 = document.forms["questionarie-p1"];
const form_p2 = document.forms["questionarie-p2"];
const form_p3 = document.forms["questionarie-p3"];

if(form_p1){
    form_p1.addEventListener("submit", (event) => {
        event.preventDefault();
        let formData = new FormData(form_p1);
        let userId = localStorage.getItem("userId");

        localStorage.setItem("userId", userId);

        localStorage.setItem(userId, JSON.stringify(formData));

        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }
        localStorage.setItem("form1", JSON.stringify(data));
        window.location.href = "questionnaire_p2.html";
    })
}

if(form_p2){
    form_p2.addEventListener("submit", (event) => {
        event.preventDefault();
        let formData = new FormData(form_p2);
        let userId = localStorage.getItem("userId");

        localStorage.setItem("userId", userId);

        localStorage.setItem(userId, JSON.stringify(formData));

        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }
        localStorage.setItem("form2", JSON.stringify(data));
        window.location.href = "questionnaire_p3.html";
    })
}

if(form_p3){
    form_p3.addEventListener("submit", (event) => {
        event.preventDefault();
        let formData = new FormData(form_p3);
        let userId = localStorage.getItem("userId");

        localStorage.setItem("userId", userId);

        localStorage.setItem(userId, JSON.stringify(formData));

        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }
        localStorage.setItem("form3", JSON.stringify(data));
        window.location.href = "questionnaire_p4.html";
    })
}


