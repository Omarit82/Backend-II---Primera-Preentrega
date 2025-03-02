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
        fetch('/api/sessions/register',{
            method: "POST", // Método HTTP
            headers: {
              "Content-Type": "application/json", // Tipo de contenido
            },
            body: JSON.stringify(payload), // Convierte el objeto en JSON
        }).then((response)=>{
            if(response.status === 201){
                Swal.fire({
                    icon:'success',
                    title: 'User created ok',
                    position: 'center',
                    timer: 3000
                }).then(() =>{
                    form.reset();
                    window.location.href = '/login';
                    }
                )// swal!
            }else{
                Swal.fire({
                    icon:'error',
                    title: 'User already exist',
                    position: 'center',
                    timer: 3000
                }).then(() =>{
                    form.reset();
                    }
                )
            }
        }).catch((e)=>{
            console.log(e)
        })
    })
})