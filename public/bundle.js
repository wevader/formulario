'use strict';

const marcarPaso = (paso) =>{
    document.querySelector(`.linea-pasos [data-paso="${paso}"] span`).classList.add('linea-pasos__paso-check--checked');
};

const siguientePaso = () =>{

    const pasos = [...document.querySelectorAll('.linea-pasos__paso')]; 

    const pasoActivo = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso');
    
    const indexPasoActivo = pasos.indexOf(pasoActivo);

    if(indexPasoActivo < pasos.length - 1){

        pasoActivo.querySelector('span').classList.remove('linea-pasos__paso-check--active');

        pasos[indexPasoActivo + 1].querySelector('span').classList.add('linea-pasos__paso-check--active');

        const id = pasos[indexPasoActivo + 1].dataset.paso;
        document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
            inline: 'start',
            behavior: 'smooth',
    }); 
    
    }

};

const formulario$3 = document.getElementById('formulario');

const validarCantidad = () => {
    const expRegCantidad = /^\d+(\.\d+)?$/;

    const inputCantidad = formulario$3.cantidad;

    if(expRegCantidad.test(inputCantidad.value)){
        inputCantidad.classList.remove('formulario__input--error');
        return true
    }else {
        inputCantidad.classList.add('formulario__input--error');
        return false
    }
};

const formulario$2 = document.getElementById('formulario');

const validarCorreo = () => {
    const expRegCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const inputCorreo = formulario$2['correo-receptor'];

    if(expRegCorreo.test(inputCorreo.value)){
        inputCorreo.classList.remove('formulario__input--error');
        return true
    }else {
        inputCorreo.classList.add('formulario__input--error');
        return false
    }
};

const formulario$1 = document.getElementById('formulario');

const validarNombre = () => {
    const expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

    const inputNombre = formulario$1['nombre-receptor'];

    if(expRegNombre.test(inputNombre.value)){
        inputNombre.classList.remove('formulario__input--error');
        return true
    }else {
        inputNombre.classList.add('formulario__input--error');
        return false
    }
};

const formulario = document.getElementById('formulario');

formulario.querySelector('.formulario__body').scrollLeft = 0;

formulario.addEventListener('keyup', (e) => {
    if(e.target.tagName === 'INPUT'){
        if(e.target.id === 'cantidad'){
            validarCantidad(); 
    } else if (e.target.id === 'nombre-receptor'){
        validarNombre();
    } else if (e.target.id === 'correo-receptor'){
        validarCorreo();
    }
    }
});

const btnFormulario = document.getElementById('formulario__btn');
btnFormulario.addEventListener('click', (e) => {
    e.preventDefault();
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

    if(pasoActual === 'cantidad'){
        if(validarCantidad()){
            marcarPaso('cantidad');
            siguientePaso();
        }
        } else if (pasoActual === 'datos'){
            if(validarNombre() && validarCorreo()){
                marcarPaso('datos');
                siguientePaso();
        } 
        }else if (pasoActual === 'metodo'){
            marcarPaso('metodo');

            //formato de moneda 
            const opciones = {style: 'currency', currency: 'MXN'};
            const formatoMoneda = new Intl.NumberFormat('es-MX', opciones);
            
            document.querySelector('[data-valor="cantidad"] span').innerText = formatoMoneda.format(formulario.cantidad.value); 
            document.querySelector('[data-valor="nombre-receptor"] span').innerText = formulario['nombre-receptor'].value;
            document.querySelector('[data-valor="correo-receptor"] span').innerText = formulario['correo-receptor'].value;
            document.querySelector('[data-valor="metodo"] span').innerText = formulario.metodo.value;
            
            btnFormulario.querySelector('span').innerHTML = 'Transferir';
            btnFormulario.classList.add('formulario__btn--disabled');

            //Ocultar el icono de siguiente
            btnFormulario
            .querySelector('[data-icono="siguiente"]')
            .classList.remove('formulario__btn-contenedor-icono--active');
            
            // mostrar icono de banco

            btnFormulario
            .querySelector('[data-icono="banco"]')
            .classList.add('formulario__btn-contenedor-icono--active');

            siguientePaso();

            //eliminar la clase disabled

            
            setTimeout(()=>{
                btnFormulario.classList.remove('formulario__btn--disabled');
            },4000);
        } else if (pasoActual === 'confirmacion' && !btnFormulario.matches('.formulario__btn--disabled')){

            btnFormulario.querySelector('span').innerText = 'Transfiriendo';

            btnFormulario.classList.add('formulario__btn--disabled');

            setTimeout(()=>{
                formulario.classList.add('formulario--hidden');
                document.getElementById('alerta').classList.add('alerta--active');

            },4000);

        }
});

const linea = document.getElementById('linea-pasos');
linea.addEventListener('click', (e) => {
    
    if(!e.target.closest('.linea-pasos__paso')){
        return false 
    }

    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;
    if(pasoActual === 'cantidad'){
        if (!validarCantidad()) return false 
    } else if (pasoActual === 'datos'){
        if (!validarCorreo() || !validarNombre()) return false
    }

    const pasoANavegar = e.target.closest('.linea-pasos__paso');

    if(pasoANavegar.querySelector('.linea-pasos__paso-check--checked')){
        const pasoActual = linea.querySelector('.linea-pasos__paso-check--active');
        pasoActual.classList.remove('linea-pasos__paso-check--active');

        const id = pasoANavegar.dataset.paso;

        linea.querySelector(`[data-paso="${id}"] span`).classList.add('linea-pasos__paso-check--active');

        const btnFormulario = document.querySelector('#formulario__btn');
        btnFormulario.querySelector('span').innerText = 'siguiente';

        btnFormulario
        .querySelector('[data-icono="banco"]')
        .classList.remove('formulario__btn-contenedor-icono--active');
        
        btnFormulario
        .querySelector('[data-icono="siguiente"]')
        .classList.add('formulario__btn-contenedor-icono--active');
        
        btnFormulario
        .classList.remove('formulario__btn--disabled');

        document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
            inline: 'start',
            behavior: 'smooth',
        });

    }



});
//# sourceMappingURL=bundle.js.map
