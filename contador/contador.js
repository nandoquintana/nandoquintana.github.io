//Elemento contador
iniciarContador('micontador');
//Inicia la cuenta atrás
//bloque es el id del bloque usado para alojar el contador regresivo.
function iniciarContador(bloque){
   let hoy = new Date();
   let ini = hoy.valueOf();
   let fin = leerFinal(bloque)
   let tiempo = Math.floor((fin - ini)/1000); //pasar a segundos enteros)
   let obContador = {timer:null, "tiempo":tiempo};
   contar(obContador, bloque); //para evitar el delay inicial de 1 segundo
   obContador.timer = setInterval(contar, 1000, obContador, bloque);
   }
//Decrementa el tiempo hasta la fecha final
//Argumento:  objeto con  temporizador y el tiempo restante
 function contar(contador, bloque){
   let partes = [];
   if(contador.tiempo <= 0){
      clearInterval(contador.timer);
      contador.tiempo = 0;  //por si la fecha final ha pasado
   }
   else{
      contador.tiempo--;            
   }
  partes = formatTiempo(contador.tiempo);
  mostrarTiempo(partes, bloque);
 }

//Convierte el tiempo restante en partes  dias, horas, minutos, segundos
function formatTiempo(tiempo){ 
   let dias, horas, minutos, segundos, partes;
   [minutos, segundos] = dividir(tiempo, 60);
   [horas, minutos] = dividir(minutos, 60);
   [dias, horas] = dividir(horas, 24); 
   partes = [dias, horas, minutos, segundos];
   return partes;
}
//divide números enteros devuelve [cociente, resto]
function dividir(num, den){
   num = Math.floor(num);
   let coc = Math.floor(num/den);
   let resto = num % den;
   return [coc, resto];
}

//Poner en la página web
//Argumento : array dias,horas,minutos,segundos
//Partes estarán dentro del bloque contador
function mostrarTiempo(partes, bloque){
   let bloques  = document.querySelectorAll("#"+bloque+" .dig span");
   for(let i=0; i < bloques.length; i++){
      bloques[i].innerHTML = partes[i].toString().padStart(2,0);
   }
 }
//Lee el valor de  fecha final desde un elemento con id = contador
//devuelve fecha final como valor
//formato de fecha año-mes-dia o año/mes/dia
function leerFinal(bloque){
   let fecha;
   let milisec = 0;
   let datos = document.getElementById(bloque);
   datos = datos.dataset.final;
   fecha = new Date(datos);
   if (!isNaN(fecha.valueOf())){
      fecha = new Date(fecha);
     milisec = fecha.valueOf();
   }
   return milisec;
}

