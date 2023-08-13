import validarCantidad from "./validarCantidad"
import marcarPaso from "./marcarPaso"
import { siguientePaso } from "./siguientePaso"

const formulario = document.getElementById('formulario')


formulario.addEventListener('keyup', (e) => {
    if(e.target.tagName === 'INPUT'){
        if(e.target.id === 'cantidad'){
            validarCantidad() 

    }
    }
})

const btnFormulario = document.getElementById('formulario__btn')
btnFormulario.addEventListener('click', (e) => {
    e.preventDefault()
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso

    if(pasoActual=== 'cantidad'){
        if(validarCantidad()){
            marcarPaso('cantidad')
            siguientePaso()
        }
        }

})