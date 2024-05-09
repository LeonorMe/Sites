const name = document.getElementById('name')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

form.addEventListener("submit", (e) =>{
    let messages = []
    if(name.value === '' || name.value == null){
        messages.push('Name is required')
    }

    if(password.length <= 6 || password.length >= 20){
        messages.push('Password is to long or to short')
    }

    if(password.value === 'password'){
        messages.push('Passwaord cannot be password')
    }

    if(messages.length > 0){
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }

    if(name.value == "adminLM" && password.value == "0000"){
        // go to restritec page
        window.location.replace("https://leonorme.github.io/portfolio/restricted/restrited_home.html"
        );
    }
})