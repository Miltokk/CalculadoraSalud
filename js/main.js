//Metodo para calcular la frecuencia maxima valor fijo 220- edad del individuo
function calcularFrecuenciaMaxima(edad) {
    return 220 - edad;
}
//Metodo para verificar segun el IMC
function tipoIMC (imc){
    if (imc<18.5){
        return "Bajo peso";
    }else if (imc>18.5 & imc<24.9){
        return "Peso Normal";
    }else if (imc>=25 & imc<=29.9){
        return "Sobrepeso";
    }else if (imc>=30 & imc<=34.9){
        return "Obesidad grado I";
    }else if (imc>=35 & imc<=39.9){
        return "Obesidad grado II";
    }
    else if (imc>39.9){
        return "Obesidad grado III";
    }
}
//Metodo para caluclar el IMC de la persona se reciben 2 parametros peso, altura y se calcula
function calcularIMC(peso, altura) {
let alturaEnMetros = altura / 100;
return peso / (alturaEnMetros * alturaEnMetros);
}
//Metodo para caluclar la tasa metabolica basal se diferencia segun entre hombre
function calcularTMB(sexo, peso, altura, edad) {
if (sexo.toLowerCase() === "hombre") {
return 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad);
} else if (sexo.toLowerCase() === "mujer") {
return 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);
} 
}
//Metodo para calcular la taza metabolica basal segun la actividad fisica que seria la anterior * un factor segun su actividad
function ajustarTMBPorActividad(tmb, actividad) {
let factorActividad;

switch (actividad.toLowerCase()) {
case "sedentario":
    factorActividad = 1.2;
    break;
case "ligero":
    factorActividad = 1.375;
    break;
case "moderado":
    factorActividad = 1.55;
    break;
case "activo":
    factorActividad = 1.725;
    break;
case "muy activo":
    factorActividad = 1.9;
    break;
}

return tmb * factorActividad;
}

function solicitarDatos() {
    let sexo = prompt("Ingrese su sexo (Hombre/Mujer):");
    let edad = parseInt(prompt("Ingrese su edad (en años):"));
    let altura = parseFloat(prompt("Ingrese su altura (en cm):"));
    let peso = parseFloat(prompt("Ingrese su peso (en kg):"));
    let actividad = prompt("Ingrese su nivel de actividad física (Sedentario, Ligero, Moderado, Activo, Muy Activo):");

    return {
        sexo: sexo,
        edad: edad,
        altura: altura,
        peso: peso,
        actividad: actividad
    };
}

function menu(){
    return parseInt(prompt("Desea calcular sus datos de salud 1) Si 2)No"));
}

let opcion=0
do {
opcion=menu();
    if(opcion!=1){
        break;
    }
    let datos =solicitarDatos();

    let frecuenciaMaxima = calcularFrecuenciaMaxima(datos.edad);
    let imc = calcularIMC(datos.peso, datos.altura);
    let tmb = calcularTMB(datos.sexo, datos.peso, datos.altura, datos.edad);
    let tmbAjustada = ajustarTMBPorActividad(tmb, datos.actividad);
    let tipoimc=tipoIMC(imc)

    let resultado = "Frecuencia Cardíaca Máxima: " + frecuenciaMaxima + " bpm\n" +
    "Índice de Masa Corporal (IMC): " + imc.toFixed(2) +" "+tipoimc+ "\n" +
    "Tasa Metabólica Basal (TMB): " + tmb.toFixed(2) + " calorías/día\n" +
    "Tasa Metabólica Basal Ajustada por Actividad: " + tmbAjustada.toFixed(2) + " calorías/día\n"+
    "Calorias para deficit caloricos consumo diario: "+((tmbAjustada-500).toFixed(2))+ " calorías/día\n"+
    "Calorias para volumen consumo diario: "+((tmbAjustada+500).toFixed(2))+ " calorías/día\n";

    alert(resultado);
}while(opcion!=2);