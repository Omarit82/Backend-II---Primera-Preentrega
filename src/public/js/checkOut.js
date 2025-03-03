document.addEventListener('DOMContentLoaded',()=>{
    "use strict";
    const quantities = document.querySelectorAll('.qty');
    const prices = document.querySelectorAll('.price');
    const totals = document.querySelectorAll('.total');
    const tot = document.getElementById('total');
    let res = 0
    for (let i=0; i<quantities.length;i++ ){
        totals[i].innerHTML = prices[i].innerHTML*quantities[i].innerHTML;
        res += parseFloat(totals[i].innerHTML);
    }
    tot.innerHTML=res;
    const btnEraseAll = document.querySelector('.btnEraseAll');
    const cartId = btnEraseAll.getAttribute('id');
    
    btnEraseAll.addEventListener('click',()=>{
        fetch('/api/carts/'+cartId,{
            method:'DELETE'
        }).then((response)=>{
            if(response.status === 200){
                Swal.fire({
                    icon:'success',
                    title: 'Cart Erased!',
                    position: 'center',
                    timer: 3000
                }).then( () =>{
                    window.location.href = '/';
                    }
                )
            }else {
                Swal.fire({
                    icon:'error',
                    title: 'Error',
                    position: 'center',
                    timer: 3000
                })
            }
        })
    })

    const botones = document.querySelectorAll('.single');
    
    botones.forEach(boton => {
        boton.addEventListener('click',()=>{
            fetch(`/api/carts/${cartId}/products/${boton.getAttribute('id')}`,{
                method:'DELETE'
            }).then((response)=>{
                if(response.status === 200){
                    Swal.fire({
                        icon:'success',
                        title: 'Product Erased!',
                        position: 'center',
                        timer: 3000
                    }).then(()=>{
                        window.location.href = '/checkout';
                    }
                    )
                }else {
                    Swal.fire({
                        icon:'error',
                        title: 'Error',
                        position: 'center',
                        timer: 3000
                    })
                }
            }).catch((error) => {
                Swal.fire({
                    icon:'error',
                    title: 'Error: '+error,
                    position: 'center',
                    timer: 3000
                    })
                }
            )
        })
    });

    const buy = document.getElementById('buy');
    buy.addEventListener('click',()=>{
        fetch(`/api/carts/${cartId}/checkout`,{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            }
        }).then(async (response)=>{
            if(response.status === 200){
                Swal.fire({
                    icon:'success',
                    title: 'Cart Buyed!',
                    position: 'center',
                    timer: 3000
                }).then( () =>{
                    window.location.href = '/';
                    }
                )
            }else {
                const data = await response.json();
                for (const id of data.products) {
                    fetch(`api/products/${id}`,{
                        method:'GET'
                    }).then(async(response)=>{
                        const res = await response.json();
                        console.log(res.prod)
                        Swal.fire({
                            icon:'error',
                            title: 'Product out of stock!',
                            text: `${res.prod.autor}, ${res.prod.title}`,
                            footer: 'The item will be erased from the cart',
                            position: 'center',
                            timer: 3000
                        })
                    })
                }
                window.location.href = '/';
            }
        }).catch((error)=>{
            Swal.fire({
                icon:'error',
                title: 'Error: '+error,
                position: 'center',
                timer: 3000
            })
        })
    })
})