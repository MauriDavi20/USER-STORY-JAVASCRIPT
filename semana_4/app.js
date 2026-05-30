const nombreInput = document.getElementById("nombre");
const precioInput = document.getElementById("precio");
const btnAgregar = document.getElementById("btnAgregar");
const btnSincronizar = document.getElementById("btnSincronizar");
const lista = document.getElementById("listaProductos");
const mensaje = document.getElementById("mensaje");



let productos = [];


const API_URL = "http://localhost:3000/productos";



function mostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.style.color = color;
}



function guardarLocalStorage() {
    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    console.log("Datos guardados");
}

function cargarLocalStorage() {

    const datos = localStorage.getItem("productos");

    if(datos){

        productos = JSON.parse(datos);

        productos.forEach(producto => {
            renderizarProducto(producto);
        });

        console.log(
            `${productos.length} productos cargados`
        );
    }
}



function renderizarProducto(producto){

    const li = document.createElement("li");

    li.innerHTML =
        `${producto.nombre} - $${producto.precio} `;

    
    const btnEliminar =
        document.createElement("button");

    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", () => {

        lista.removeChild(li);

        productos = productos.filter(
            p => p.id !== producto.id
        );

        guardarLocalStorage();

        eliminarProductoAPI(producto.id);

        console.log("Producto eliminado");
    });

    
    const btnEditar =
        document.createElement("button");

    btnEditar.textContent = "Editar";

    btnEditar.addEventListener("click", () => {

        const nuevoNombre =
            prompt("Nuevo nombre", producto.nombre);

        const nuevoPrecio =
            prompt("Nuevo precio", producto.precio);

        if(!nuevoNombre || !nuevoPrecio){
            return;
        }

        producto.nombre = nuevoNombre;
        producto.precio = nuevoPrecio;

        li.firstChild.textContent =
            `${producto.nombre} - $${producto.precio} `;

        guardarLocalStorage();

        actualizarProductoAPI(producto);
    });

    li.appendChild(btnEditar);
    li.appendChild(btnEliminar);

    lista.appendChild(li);
}



btnAgregar.addEventListener("click", async () => {

    const nombre = nombreInput.value.trim();
    const precio = precioInput.value.trim();

    
    if(nombre === "" || precio === ""){

        mostrarMensaje(
            "Todos los campos son obligatorios",
            "red"
        );

        return;
    }

    if(Number(precio) <= 0){

        mostrarMensaje(
            "Precio inválido",
            "red"
        );

        return;
    }

    const producto = {
        id: Date.now(),
        nombre,
        precio
    };

    productos.push(producto);

    renderizarProducto(producto);

    guardarLocalStorage();

    await agregarProductoAPI(producto);

    nombreInput.value = "";
    precioInput.value = "";

    mostrarMensaje(
        "Producto agregado correctamente",
        "green"
    );
});


async function obtenerProductosAPI(){

    try{

        const respuesta =
            await fetch(API_URL);

        const datos =
            await respuesta.json();

        console.log("GET:", datos);

        return datos;

    }catch(error){

        console.error(error);

        mostrarMensaje(
            "Error obteniendo datos",
            "red"
        );
    }
}


async function agregarProductoAPI(producto){

    try{

        const respuesta = await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(producto)

        });

        const data =
            await respuesta.json();

        console.log("POST:", data);

    }catch(error){

        console.error(error);
    }
}



async function actualizarProductoAPI(producto){

    try{

        const respuesta = await fetch(

            `${API_URL}/${producto.id}`,

            {
                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(producto)
            }

        );

        const data =
            await respuesta.json();

        console.log("PUT:", data);

    }catch(error){

        console.error(error);
    }
}


async function eliminarProductoAPI(id){

    try{

        await fetch(

            `${API_URL}/${id}`,

            {
                method:"DELETE"
            }

        );

        console.log(
            `DELETE realizado para ID ${id}`
        );

    }catch(error){

        console.error(error);
    }
}



btnSincronizar.addEventListener(
    "click",
    async () => {

        const datos =
            await obtenerProductosAPI();

        console.log(
            "Datos del servidor:",
            datos
        );
    }
);


cargarLocalStorage();


//Instalacion:

//npm install -g json-server

//json-server --watch db.json --port 3000