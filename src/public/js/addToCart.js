document.addEventListener('DOMContentLoaded', ()=>{
    "use strict";
    const formulario = document.getElementById('addToCart');
    const cartId = document.getElementById('cart');    
    formulario.addEventListener('submit',(event)=>{
        event.preventDefault();
        const data = new FormData(formulario); 
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
            if(response.status == 200){
                Swal.fire({
                    icon:'success',
                    title: 'Product Added!',
                    position: 'center',
                    timer: 1500
                }).then(()=>{
                    window.location.href = '/';
                    }
                )
            } else {
                Swal.fire({
                    icon:'error',
                    title: 'Fail to add product!',
                    position: 'center',
                    timer: 1500
                }).then(()=>{
                    window.location.href = '/';
                    }
                )
            }
        }).catch((error) =>{
            Swal.fire({
                icon:'error',
                title: 'Error!: '+error,
                position: 'center',
                timer: 3000
            }).then(()=>{
                window.location.href = '/';
                }
            );
        })
       
    })
})