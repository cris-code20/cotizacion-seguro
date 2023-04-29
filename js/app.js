// crear construtores 

function Seguro(marca, year, tipo){

    this.marca = marca;
    this.year = year;
    this.tipo = tipo

};



Seguro.prototype.cotizacion = function(){


    let cantidad;
    let base = 2000
     
    switch(this.marca){

        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
             cantidad = base * 1.35;
        break;

        default:
            break;

    }


    const diferiencia = new Date().getFullYear() - this.year;
     cantidad -= ((diferiencia * 3) * cantidad ) / 100;
     
     if(this.tipo === 'basico'){
        cantidad += 1.30;
     }else{
        cantidad += 1.50;
     }

     return cantidad;

}



function UI(){}

UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear(),
          min = max - 20;

    const selectYear = document.querySelector('#year');

    for(let i = max; i >= min; i--){
        let opcion = document.createElement('option')
        opcion.value = i;
        opcion.textContent = i;
        selectYear.appendChild(opcion);
    }
        
}

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    if(tipo === 'error'){
        div.classList.add('error')
    }else{
        div.classList.add('correcto')
    }

    div.classList.add('mensaje', 'mt-10')
    div.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'))


    setTimeout(() =>{
        div.remove();
    }, 2000)
}


UI.prototype.mstrarResultado = (total, seguro   ) =>{

    const {marca, year, tipo} = seguro

    let textoMarca;

    switch(marca){
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }

    const div = document.createElement('div')
    div.classList.add('mt-10')
    div.innerHTML = `

        <p class="header"> Tu Resumen </p>
        <p class="font-bold">marca: <span class="font-normal"> ${textoMarca} </span> </p>
        <p class="font-bold">year: <span class="font-normal"> ${year} </span> </p>
        <p class="font-bold">tipo: <span class="font-normal"> ${tipo} </span> </p>
        <p class="font-bold">Total: <span class="font-normal"> $${total} </span> </p>
    
    `;


    const resultado = document.querySelector('#resultado');



    const spiner = document.querySelector('#cargando');
    spiner.style.display = 'block';

    setTimeout(() =>{
    resultado.appendChild(div)
    spiner.style.display = 'none';
    }, 2000)

}

// instanciar ui 


const ui = new UI();

document.addEventListener('DOMContentLoaded', ()=>{

ui.llenarOpciones();


})

eventos();  
function eventos(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();
    const marca = document.querySelector('#marca').value;

    const year = document.querySelector('#year').value;

    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === "" || year === "" || tipo === ""){
        ui.mostrarMensaje('todos los campos son obligatorio', 'error')
        return;
    };

    ui.mostrarMensaje('cotizando....', 'exito');

    const resultados = document.querySelector('#resultado div')

    if(resultados != null){
        resultados.remove();
    }


    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizacion()

    ui.mstrarResultado(total, seguro)
}