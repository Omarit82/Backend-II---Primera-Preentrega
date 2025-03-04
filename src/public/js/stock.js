document.addEventListener('DOMContentLoaded',() => {
    "use strict";

    const btnsStock = document.querySelectorAll('.formStock');
    for (const btn of btnsStock) {
        btn.addEventListener('submit',(event)=>{
            event.preventDefault();
            const data = new FormData(btn);
            const id = btn.getAttribute('id');
            const info = {"stock":data.get('new_stock')}
            fetch(`/api/products/${id}`,{
                method:'PUT',
                headers: {
                    "Content-Type": "application/json", // Tipo de contenido
                    },
                body: JSON.stringify(info)
            }).then((response)=>{
                if(response.status === 200) {
                    Swal.fire({
                        icon:'success',
                        title: 'Product stock updated!',
                        position: 'center',
                        timer: 3000
                    })
                }else{
                    Swal.fire({
                        icon:'error',
                        title: 'Stock not updated!',
                        position: 'center',
                        timer: 3000
                    })
                }
                window.location.href = '/view-stock';
            }).catch((error) => {
                Swal.fire({
                    icon:'error',
                    title: 'Error!',
                    position: 'center',
                    timer: 3000
                })
            })
        })
    }
    
})