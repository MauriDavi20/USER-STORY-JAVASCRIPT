const id = prompt('Ingrese la clave unica del producto:');
const nombre = prompt('Ingrese el nombre del producto:');
const precioInput = prompt('Ingrese el precio del producto:');

if (!id || id.trim() === "") {
    console.log(" ID inválido");
} else if (!nombre || nombre.trim() === "") {
    console.log(" Nombre inválido");
} else {
    const precio = Number(precioInput);

    if (isNaN(precio) || precio <= 0) {
        console.log(" Precio inválido");
    } else {

        
        const datos = {
            'ID': id.trim(),
            'Nombre': nombre.trim(),
            'Precio': precio
        };

        console.log("\n DATOS DEL PRODUCTO:");
        for (const propiedad in datos) {
            console.log(`${propiedad}: ${datos[propiedad]}`);
        }

        const numeros = new Set([1,2,3,4,5,1,1,1,1,1]);
        console.log("\n SET inicial:", numeros);

        numeros.add(10);
        console.log("Existe el número 3?", numeros.has(3));
        numeros.delete(4);

        console.log("\n SET final:");
        for (const valor of numeros) {
            console.log(valor);
        }

        const productos = new Map();

        productos.set('Electrónica', 'Teléfono móvil');
        productos.set('Hogar', 'Aspiradora');
        productos.set('Ropa', 'Chaqueta');
        productos.set('Alimentos', 'Café');

        console.log("\n MAP completo:");
        console.log(productos);

        console.log("\n Producto en categoría 'Ropa':");
        console.log(productos.get('Ropa'));

        console.log("\n LISTA DE PRODUCTOS:");
        productos.forEach((valor, clave) => {
            console.log(`Categoría: ${clave} → Producto: ${valor}`);
        });
    }
}


