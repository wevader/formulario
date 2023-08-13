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

const formulario = document.getElementById('formulario');


formulario.addEventListener('keyup', (e) => {
    if(e.target.tagName === 'INPUT'){
        if(e.target.id === 'cantidad'){
            validarCantidad(); 
        }

    }

});
//# sourceMappingURL=bundle.js.map
