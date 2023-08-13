'use strict';

const formulario$1 = document.getElementById('formulario');

const validarCantidad = () => {
    const expRegCantidad = /^\d+(\.\d+)?$/;

    const inputCantidad = formulario$1.cantidad;

    if(expRegCantidad.test(inputCantidad.value)){
        inputCantidad.classList.remove('formulario__input--error');
        return true
    }else {
        inputCantidad.classList.add('formulario__input--error');
        return false
    }
};

const marcarPaso = (paso) =>{
    document.querySelector(`.linea-pasos [data-paso="${paso}"] span`).classList.add('linea-pasos__paso-check--checked');
};

const formulario = document.getElementById('formulario');


formulario.addEventListener('keyup', (e) => {
    if(e.target.tagName === 'INPUT'){
        if(e.target.id === 'cantidad'){
            validarCantidad(); 

    }
    }
});

const btnFormulario = document.getElementById('formulario__btn');
btnFormulario.addEventListener('click', (e) => {
    e.preventDefault();
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

    if(pasoActual=== 'cantidad'){
        if(validarCantidad()){
            marcarPaso('cantidad');
        }
        }

});
//# sourceMappingURL=bundle.js.map
