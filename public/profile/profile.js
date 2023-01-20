fetch('/currentUser', {
    method: "GET",
    headers: {
        authorization: localStorage.getItem('token')
    }
}).then(result => result.json())
.then(json => {
    if (json.error) location.replace('../')
})
.catch(error => console.log(error))

let btn = document.getElementById('logoutBtn')
btn.addEventListener('click', evt => {
    evt.preventDefault()
    localStorage.removeItem('token')
    location.replace('../')
})