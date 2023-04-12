export default{

    pintarDatos(){
        let mostrarDatos = JSON.parse(localStorage.getItem("dataLocalStorage"));
        
        const ws = new Worker("storage/wsMyHeader.js", {type: "module"})

        let id = [];
        let count = 0; 

        id.push("#myHeader");
        ws.postMessage({module: "mostrarHeader", data : mostrarDatos})

        id.push("#tablaIngreso");
        ws.postMessage({module: "mostrarIngreso", data : mostrarDatos})

        id.push("#tablaEgreso");
        ws.postMessage({module: "mostrarEgreso", data : mostrarDatos})

        ws.addEventListener("message", (e)=>{
            document.querySelector(id[count]).innerHTML = e.data;
            
            (id.length-1==count) ? ws.terminate() : count++;
        })
    }
}