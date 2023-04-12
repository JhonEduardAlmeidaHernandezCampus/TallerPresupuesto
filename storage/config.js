export default {
    guardarLocalStorage(){
        localStorage.setItem("dataLocalStorage", JSON.stringify({
            data:{
                ingresos:[],
                egresos: []
            }
        }))
    }
}