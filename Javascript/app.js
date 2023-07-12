import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
    input.addEventListener('blur', (input) => {
        valida(input.target);
    });  // en este ciclo vamos a recolectar todas las input y se almacenan para gestionarlos con la funcion valida
})