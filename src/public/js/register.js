document.addEventListener('DOMContentLoaded',()=>{
    "use strict";
    const form = document.getElementById('form');
    form.addEventListener('submit',(event) => {
        event.preventDefault();
        const data = new FormData(form);
        const payload = {
            "first_name": data.get('first_name'),
            "last_name": data.get('last_name'),
            "email": data.get('email'),
            "age": data.get('age'),
            "password": data.get('password')
        }
        fetch('/api/users/register',{
            method: "POST", // Método HTTP
            headers: {
              "Content-Type": "application/json", // Tipo de contenido
            },
            body: JSON.stringify(payload), // Convierte el objeto en JSON
        }).then((response)=>{
            console.log(response) // swal!
        }).catch((e)=>{
            console.log(e) // swal
        }).finally(()=>{
            form.reset()
            window.location.href = '/login'
        })
    })
})