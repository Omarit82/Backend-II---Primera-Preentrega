document.addEventListener('DOMContentLoaded',()=>{
    "use strict";
    const form = document.getElementById('formLogin');
    form.addEventListener('submit',(event)=>{
        event.preventDefault();
        const data = new FormData(form);
        const user = {
           "email":data.get('email'),
           "password":data.get('password') 
        }
        fetch('/api/sessions/login',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }).then((response)=>{
            if(response.status === 200){
                Swal.fire({
                    icon:'success',
                    title: 'Login Exitoso!',
                    position: 'center',
                    timer: 3000
                }).then( () =>{
                    form.reset();
                    window.location.href = '/';
                    }
                )
            }else if(response.status === 401){
                Swal.fire({
                    icon:'error',
                    title: 'Wrong email or password',
                    position: 'center',
                    timer: 3000
                }).then(() =>{
                    form.reset();
                    }
                )
            }else{
                Swal.fire({
                    icon:'error',
                    title: 'Error',
                    position: 'center',
                    timer: 3000
                })
            }
        }).catch((error) =>{
            console.log(error);
        })
    })
})