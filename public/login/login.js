let btn = document.getElementById('loginBtn')
btn.addEventListener('click', evt => {
    evt.preventDefault()
    let sendObject = {}
    let form = document.getElementById('loginForm')
    let data = new FormData(form)
    data.forEach((value, key) => sendObject[key]=value)
    fetch('/login', {
        method: "POST",
        body: JSON.stringify(sendObject),
        headers: {
            'Content-Type': "application/json"
        }
    }).then(result => result.json())
    .then(json => {
        if (json.error) {
            console.log(json.error)
        } else {
            localStorage.setItem('token', `${json.token}`)
            location.replace('../')
        }
    })
})