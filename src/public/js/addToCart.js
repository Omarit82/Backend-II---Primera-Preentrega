document.addEventListener('DOMContentLoaded', ()=>{
    "use strict";

    const formulario = document.getElementById('addToCart');
    const cartId = document.getElementById('cart');    
    formulario.addEventListener('submit',(event)=>{
        event.preventDefault();
        const data = new FormData(formulario); 
        console.log(parseInt(data.get('quantity')));
        const payload= {
            quantity:parseInt(data.get('quantity'))
        }
        fetch(`/api/carts/${cartId.getAttribute('cart_id')}/products/${data.get('product_id')}`,{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        }).then((response)=>{
            console.log(response);
        }).catch((error) =>{
            console.log(error);
        }).finally(()=>{
            formulario.reset();
            window.location.href = '/'
        })
       
    })
})