// const inputNacimiento = document.querySelector("#birth"); //capturamos la informacion del input

// inputNacimiento.addEventListener('blur', (evento) =>{ // empezamos  a escuchar el evento blur para que se dispare cuando salgamos de la casilla de fecha.
//     validarNacimiento(evento.target);
// });

// Codigo corregido a partir de aqui 

export function valida(input){
    const tipoDeInput = input.dataset.tipo; //aqui estamos recolectando los datas de html y el tipo es el nombre que hay en la linea 45 de html del data en especifico
    if (validadores[tipoDeInput]) { //verificamos si el tipo de input esta en la constante validadores
        validadores[tipoDeInput](input); // luego le decimos que le pasamos el parametro de input
    }
    if(input.validity.valid){  //aqui le cambiamos el efecto de error en la casilla por un color rojo con esta clase automatica  input-container--invalid
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }
    else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHtml = mostrarMensajeDeError(tipoDeInput, input);
    };
};

//Creamos un arreglo con los datos de los tipos de errores

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

// Aqui estamos creando msj de error para cada una de las casillas necesarias
const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío",
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch:
        "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es: XXXXXXXXXX 10 numeros"
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres."
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 4 a 30 caracteres."
    },
    estado:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El estado debe contener entre 4 a 30 caracteres."
    },
};
const validadores = {   // se crea una coleccion con el campo de llave y valor
    nacimiento:(input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
        console.log(tipoDeInput, error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput][error]);
        mensaje = mensajesDeError[tipoDeInput][error];
    }
    });
    return mensaje;
}

function validarNacimiento(input){  // capturando la fecha que se ingresa en el campo
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = 'Debes ser mayor de edad'
    } // llamamos a la funcion MayorDeEdad y le pasamos el parametro fechaCliente que estara abajo en la funcion

    input.setCustomValidity(mensaje)
    
}

function mayorDeEdad(fecha){
    const fechaActual = new Date(); //creamos una instancia de fecha actual solo pasando el dato de new Date
    const diferenciaFechas = new Date(fecha.getUTCFullYear()+ 18, fecha.getUTCMonth(), fecha.getUTCDate()); // capturamos la fecha por partes y le sumamos 18 años para que se pueda lograr hacer una comparacion
    return diferenciaFechas <= fechaActual; // aqu icomparamos si la fecha actual es mayor a la fecha que puso el usuario
}
