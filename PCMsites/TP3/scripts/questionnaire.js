function generateNewID(){
    localStorage.setItem("userID", crypto.randomUUID())
}

const form_p1 = document.forms["questionarie-p1"];
const form_p2 = document.forms["questionarie-p2"];
const form_p3 = document.forms["questionarie-p3"];

if(form_p1){
    form_p1.addEventListener("submit", (event) => {
        event.preventDefault();
        let formData = Object.fromEntries(new FormData(form_p1));
        let userId = localStorage.getItem("userId");

        localStorage.setItem("userId", userId);
        localStorage.setItem(userId, JSON.stringify(formData));
        //window.location.href = "questionnaire_p2.html";
    })
}

if(form_p2){
    form_p2.addEventListener("submit", (event) => {
        event.preventDefault();
        let formData = Object.fromEntries(new FormData(form_p2));
        let userId = localStorage.getItem("userId");
        let userData = JSON.parse(localStorage.getItem(userId));
        localStorage.setItem(userId, JSON.stringify(Object.assign(userData, formData)));
        //window.location.href = "questionnaire_p3.html";
    });
}

if(form_p3){
    form_p3.addEventListener("submit", (event) => {
        event.preventDefault();
        let formData = Object.fromEntries(new FormData(form_p3));
        let userId = localStorage.getItem("userId");
        let userData = JSON.parse(localStorage.getItem(userId));

        localStorage.setItem(userId, JSON.stringify(Object.assign(userData, formData)));
        //window.location.href = "questionnaire_p4.html";
    })
}
