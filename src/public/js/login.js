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
            console.log(response);
            Swal.fire({
                toast:true,
                animation: false,
                icon:'success',
                title: 'Login Exitoso!',
                position: 'top-right',
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
        }).catch((error) =>{
            console.log(error);
        }).finally(()=>{
            form.reset();
            window.location.href = '/'
        })
    })
})