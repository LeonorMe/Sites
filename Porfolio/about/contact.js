const name = document.getElementById('name')
const email = document.getElementById('password')
const subject = document.getElementById('subject')
const message = document.getElementById('message')

const form = document.getElementById('form')
const errorElement = document.getElementById('error')

form.addEventListener("send", (e) =>{
    let messages = []
    if(name.value === '' || name.value == null){
        messages.push('Name is required.')
    }

    if(subject.length >= 30){
        messages.push('Subject is to long.')
    }

    if(message.value === 'spam'){
        messages.push('Please do not send spam.')
    }

    if(messages.length > 0){
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }
})