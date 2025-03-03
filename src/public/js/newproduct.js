document.addEventListener('DOMContentLoaded',()=>{
    "use strict";
    const prod = document.getElementById('loadProduct');
    prod.addEventListener('submit',(event)=>{
        event.preventDefault();
        const data =new FormData(prod);
        const payload = {
            title:data.get('title'),
            autor:data.get('autor'),
            year:data.get('year'),
            genere:data.get('genere'),
            price:data.get('price'),
            stock:data.get('stock'),
            code:data.get('code'),
            thumbnails:data.get('thumbnails')
        }
        fetch('api/products',{
            method: "POST", // Método HTTP
            headers: {
              "Content-Type": "application/json", // Tipo de contenido
            },
            body: JSON.stringify(payload), // Convierte el objeto en JSON
        }).then((response)=>{
            if(response.status === 200) {
                Swal.fire({
                    icon:'success',
                    title: 'Product added!',
                    position: 'center',
                    timer: 1500
                }).then( () =>{
                    prod.reset();
                    window.location.href = '/';
                    }
                )
            }
        }).catch((e)=>{
            Swal.fire({
                icon:'error',
                title: 'Fail to add product!',
                position: 'center',
                timer: 1500
            }).then( () =>{
                prod.reset();
                window.location.href = '/';
                }
            )
        })
    })
})