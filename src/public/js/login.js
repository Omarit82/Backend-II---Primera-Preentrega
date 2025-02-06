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
        fetch('/api/users/login',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }).then((response)=>{
            console.log(response);
        }).catch((error) =>{
            console.log(error);
        }).finally(()=>{
            form.reset();
            window.location.href = '/'
        })
    })
})