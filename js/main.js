var tablero;
var teclas =
{
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};
var fondo = {
	imagenURL: "img/fondo.png"
};

var tifis = {
	x: 0,
	y: 0,
	frenteOK: false,
	atrasOK: false,
	izqOK: false,
	derOK: false,
	velocidad: 5
};

var liz = {
	lizOK: false,
	x: 100,
	y: 0
}

function inicio()
{
	var canvas = document.getElementById("campo");
	tablero = canvas.getContext("2d");

	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo;

	tifis.frente = new Image();
	tifis.frente.src = "img/diana-frente.png";
	tifis.frente.onload = confirmarFrente;

	tifis.atras = new Image();
	tifis.atras.src = "img/diana-atras.png";
	tifis.atras.onload = confirmarAtras;

	tifis.izq = new Image();
	tifis.izq.src = "img/diana-izq.png";
	tifis.izq.onload = confirmarIzq;

	tifis.der = new Image();
	tifis.der.src = "img/diana-der.png";
	tifis.der.onload = confirmarDer;

	liz.lizy = new Image();
	liz.lizy.src = "img/liz.png";
	liz.lizy.onload = confirmarLiz;

	document.addEventListener("keydown", teclado);
}
function teclado(evento)
{
	var codigo = evento.keyCode;
	if(codigo == teclas.UP)
	{
		var limiteArriba = false;
		//LimiteArribaUno
		if(tifis.y < 0)
		{
			limiteArriba = true;
		}
		//LimiteArribaDos
		if(tifis.y == 250 & tifis.x < 150)
		{
			limiteArriba = true;
		}
		//LimiteArribaTres
		if(tifis.y == 250 & tifis.x > 160 & tifis.x < 240)
		{
			limiteArriba = true;
		}
		//LimiteArribaCuatro
		if(tifis.y == 400 & tifis.x > 110 )
		{
			limiteArriba = true;
		}
		//Si no hay obstaculo 
		if(limiteArriba ==false)
		{
		tifis.y -= tifis.velocidad;
		}
	}
	if(codigo == teclas.DOWN)
	{
		var limiteAbajo = false;
		//LimiteAbajoUno
		if(tifis.y > 450)
        {
        	limiteAbajo = true
        }
		//LimiteAbajoDos
		if(tifis.y == 150 & tifis.x < 140)
        {
        	limiteAbajo = true
        }
		//LimiteAbajoTres
		if(tifis.y == 300 & tifis.x > 150)
        {
        	limiteAbajo = true
        }        
        //Si no hay obstaculo
        if(limiteAbajo == false)
        {
            tifis.y += tifis.velocidad;
        }
	}
	if(codigo == teclas.LEFT)
	{
		var limiteIzquierda = false;
		//limiteIzquierdaUno
		if(tifis.x < -10){
			limiteIzquierda = true
		}
		//limiteIzquierdaDos
		if(tifis.x == 240 & tifis.y < 250){
			limiteIzquierda = true
		}
		//limiteIzquierdaTres
		if(tifis.x == 140 & tifis.y > 150 & tifis.y < 250){
			limiteIzquierda = true
		}
		//Si no hay obstaculo	
		if(limiteIzquierda == false)
		{
			tifis.x -= tifis.velocidad;
		}
			
	}
	if(codigo == teclas.RIGHT)
	{

		var limiteDerecha = false;
		//LimiteUno 
		if(tifis.x==460){
			limiteDerecha = true;
		}
		//LimiteDos
		if(tifis.x==160 & tifis.y <= 240){
			limiteDerecha = true;
		}
		//LimiteTres		
		if(tifis.x==110 & tifis.y > 300 & tifis.y < 400)
		{
			limiteDerecha = true;
		}		

		if(limiteDerecha == false)
		{
			tifis.x += tifis.velocidad;
		}
	}
	dibujar(codigo);
	/*-------------------------***********************-----------------------------------*/			
	//Hay colisión????
	var colisión = false;

	if(tifis.x >= (liz.x -20) & tifis.x <= (liz.x + 20) & (tifis.y + 30) >= liz.y & tifis.y <= (liz.y + 30))
	{
		alert("Hubo una colisión");

		//tifis al punto de sálida
		tifis.x = 0;
		tifis.y = 0;
		//liz a una nueva posición aleatória
		aleatorio()
		function aleatorio(){ 
		   	
		   	xAleatorio = Math.random() * 450; 
		   	xAleatorio = Math.round(xAleatorio);
		   	liz.x = xAleatorio;
		   	yAleatorio = Math.random() * 450; 
		   	yAleatorio = Math.round(yAleatorio);
		   	liz.y = yAleatorio;
		   	//alert(xAleatorio + " "+ yAleatorio);
			/*obstaculos para liz --------------------------*/
			var obstaculo = false;	
			//obstaculo 1
			if(liz.y > 150 & liz.y < 250 & liz.x < 150)
			{
				obstaculo = true;
			}
			//obstaculo 2
			if(liz.y > 300 & liz.y < 400 & liz.x > 150)
			{
				obstaculo = true;
			}
			//obstaculo 3
			if(liz.y < 250 & liz.x > 150 & liz.x < 250)
			{
				obstaculo = true;
			}
			if(obstaculo == true)
			{	
				aleatorio();
			}		
		} 

	}


	/*----------------------********************--------------------------------------*/			
}
function confirmarFondo()
{
	fondo.imagenOK = true;
	dibujar();
}
function confirmarFrente()
{
	tifis.frenteOK = true;
	dibujar();
}
function confirmarAtras()
{
	tifis.atrasOK = true;
	dibujar();
}
function confirmarDer()
{
	tifis.derOK = true;
	dibujar();
}
function confirmarIzq()
{
	tifis.izqOK = true;
	dibujar();
}

function confirmarLiz()
{
	liz.lizOK = true;
	dibujar();
}
function dibujar(direccion)
{
	//Capa 1: Fondo	
	if(fondo.imagenOK)
	{
		tablero.drawImage(fondo.imagen, 0,0);
	}
	//Capa 2: Tifis
	var tifisOrientada = tifis.frente;

	if(tifis.frenteOK == true && tifis.atrasOK && tifis.derOK && tifis.izqOK)
	{
		if(direccion == teclas.DOWN || direccion == undefined)
		{
			tifisOrientada = tifis.frente;
		}
		else if(direccion == teclas.UP)
		{
			tifisOrientada = tifis.atras;
		}
		else if(direccion == teclas.LEFT)
		{
			tifisOrientada = tifis.izq;
		}
		else if(direccion == teclas.RIGHT)
		{
			tifisOrientada = tifis.der;
		}
	}
	tablero.drawImage(tifisOrientada, tifis.x, tifis.y);
	//Capa 3: Liz
	//Como lizOK es boleana (verdadera o falsa), no necesiuto comparar.
	if(liz.lizOK)
	{
		tablero.drawImage(liz.lizy, liz.x, liz.y);
	}
}