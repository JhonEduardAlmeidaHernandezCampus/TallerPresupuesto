import config from "../storage/config.js";
import myHeader from "./myHeader.js";

export default {

    GuardarDatos(){
        if(localStorage.dataLocalStorage){
            myHeader.pintarDatos();
        }else{
            config.guardarLocalStorage();
            myHeader.pintarDatos();
        }

        let formulario = document.querySelector("#formulario");

        formulario.addEventListener("submit", (e) =>{
            let infoLocal = JSON.parse(localStorage.getItem("dataLocalStorage"));
            e.preventDefault();
            let myData = Object.fromEntries(new FormData(e.target))

            if(myData.opcion == "ingreso"){
                infoLocal.data.ingresos.unshift(myData)
            } else{
                infoLocal.data.egresos.unshift(myData)
            }

            localStorage.setItem("dataLocalStorage", JSON.stringify(infoLocal))

            myHeader.pintarDatos();
            formulario.reset();
        })
    }
}