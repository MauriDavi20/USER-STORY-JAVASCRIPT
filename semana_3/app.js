// TASK 2: Selección e inspección

const inputNota = document.getElementById("inputNota");
const btnAgregar = document.getElementById("btnAgregar");
const listaNotas = document.querySelector("#listaNotas");

console.log("Input:", inputNota);
console.log("Botón:", btnAgregar);
console.log("Lista:", listaNotas);

// TASK 5: Persistencia con Local Storage

let notas = [];

// Cargar notas guardadas
const notasGuardadas = localStorage.getItem("notas");

if (notasGuardadas) {
    notas = JSON.parse(notasGuardadas);

    notas.forEach(nota => {
        renderizarNota(nota);
    });

    console.log(`${notas.length} notas cargadas desde Local Storage`);
}

// Función para guardar en Local Storage
function guardarNotas() {
    localStorage.setItem("notas", JSON.stringify(notas));
    console.log("Notas guardadas en Local Storage");
}

// Función para crear elementos en el DOM
function renderizarNota(textoNota) {

    const li = document.createElement("li");
    li.textContent = textoNota + " ";

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    // TASK 4: Eliminar notas
    btnEliminar.addEventListener("click", () => {

        listaNotas.removeChild(li);

        notas = notas.filter(nota => nota !== textoNota);

        guardarNotas();

        console.log(`Nota eliminada: ${textoNota}`);
    });

    li.appendChild(btnEliminar);
    listaNotas.appendChild(li);
}

// TASK 3: Agregar notas

btnAgregar.addEventListener("click", () => {

    const textoNota = inputNota.value.trim();

    // Validación
    if (textoNota === "") {
        alert("Por favor escribe una nota.");
        return;
    }

    // Agregar al arreglo
    notas.push(textoNota);

    // Renderizar en pantalla
    renderizarNota(textoNota);

    // Guardar en Local Storage
    guardarNotas();

    console.log(`Nota agregada: ${textoNota}`);

    // Limpiar y enfocar
    inputNota.value = "";
    inputNota.focus();
});