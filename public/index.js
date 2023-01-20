fetch('/currentUser', {
    method: "GET",
    headers: {
        authorization: localStorage.getItem('token')
    }
}).then(result => {
    console.log(result)
    //no autenticado o no autorizado
    if (result.status === 401 || result.status === 403 || result.status === 404) location.replace('/login')
    //autorizado
    else {
        location.replace('/profile')
    }
}).catch(error => console.log(error))