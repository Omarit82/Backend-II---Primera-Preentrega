document.addEventListener('DOMContentLoaded', ()=>{
    "use strict";

    const formulario = document.getElementById('addToCart');
    formulario.addEventListener('submit',(event)=>{
       event.preventDefault();
       const data = new FormData(formulario);
       console.log(data)
    })
})