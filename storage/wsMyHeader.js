let wsMyHeader = {
    
    mostrarHeader(p1){

        let totalIngresos = 0;
        let totalEgresos = 0;
        
        if(p1.data.egresos.length == 0){
            totalEgresos = 0;
        }else{
            p1.data.egresos.forEach((val, id) =>{
                totalEgresos = totalEgresos + parseInt(val.valor)
            })
        }

        if(p1.data.ingresos.length == 0){
            totalIngresos = 0;
        }else{
            p1.data.ingresos.forEach((val, id) =>{
                totalIngresos = totalIngresos + parseInt(val.valor)
            })
        }

        let presupuestoDisponible = totalIngresos - totalEgresos

        let plantilla = `
                        <h4 class="mb-4 text-white">Presupuesto Disponible</h4>
                        <h1 class="mb-4 text-white">$ ${new Intl.NumberFormat().format(presupuestoDisponible)}</h4>

                        <div class="col-12 bg-info mb-2 py-2 d-flex justify-content-around">
                            <p class="m-0 text-white">INGRESOS</p>
                            <p class="m-0 text-white">$  ${new Intl.NumberFormat().format(totalIngresos)}</p>
                        </div>
                        <div class="col-12 bg-danger py-2 d-flex justify-content-around">
                            <p class="m-0 v text-white">EGRESOS</p>
                            <p class="m-0 text-white">$  ${new Intl.NumberFormat().format(totalEgresos)}</p>
                        </div>
                        `
        return plantilla;
    }, 

    mostrarIngreso(p1){
        let mostrarDataIngreso = p1.data.ingresos.map((val, id) => {
            return `
                    <tr class="d-flex p-2 border-bottom">
                        <td class="col-7 col-sm-8 fs-5">${val.descripcion}</td>
                        <td class="col-5 col-sm-4 fs-6 text-success">+$ ${new Intl.NumberFormat().format(parseInt(val.valor))}</td>
                    </tr>
                    
                   `;
        }).join("");        
        return mostrarDataIngreso;
    },

    mostrarEgreso(mostrarDatos){
        let suma = 0;
        mostrarDatos.data.egresos.map((val, id) =>{
            let number = parseInt(val.valor)
            suma = suma + number
        })
      
        let mostrarDataEgresos = mostrarDatos.data.egresos.map((val, id) =>{
    
            let porcentaje = val.valor * 100 / suma;
            return `
            <tr class="responsive d-flex p-2 border-bottom">
                <td class="descripciones col-sm-7 fs-5">${val.descripcion}</td>
                <td class="valores col-sm-3 fs-6 text-danger">-$ ${new Intl.NumberFormat().format(val.valor)}</td>
                <td class="porcentajes col-sm-2 fs-6 m-0 p-0 bg-danger rounded text-white text-center" style="--bs-bg-opacity: .4;">${porcentaje.toFixed(2)} %</td>
            </tr>
        `   
        }).join("");
        return mostrarDataEgresos;
    },
}

self.addEventListener("message", (e) => {
    postMessage(wsMyHeader[`${e.data.module}`](e.data.data));
})