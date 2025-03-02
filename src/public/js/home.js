document.addEventListener('DOMContentLoaded',async()=>{
    "use strict";
    try {
        const products = await fetch('/api/products',{
            method: 'GET'
        });
        if(products.status === 200){
            const data = await products.json();
            console.log(data);
            
        }
    } catch (error) {
        console.log('Error al cargar los productos')
    }
    
})