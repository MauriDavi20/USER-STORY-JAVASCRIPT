const nombre = prompt('Ingrese su nombre: ');
const edad = prompt('Ingrese su edad: ');
 
if (isNaN(edad)){
    console.error('Error: Por favor, ingresa una edad válida en números.');

}else if(edad => 18){
    alert(`Hola ${nombre}, eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!`)

}else{
    alert(`Hola ${nombre}, eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!"`);
}