var juego = {
	filas:[[],[],[]],
	espacioVacio: {
    	fila:2,
    	columna:2,
	},
	crearPieza: function(numero, fila, columna){
   	  var elemento = $("<div>");
   	  elemento.addClass("pieza");
   	 	elemento.css({
   	 	backgroundImage:"url('piezas/"+numero+".jpg')",
  	  	top:fila*200,
  	  	left:columna*200
      });
        var objeto = {};
  		  	objeto.pieza=elemento;
  		  	objeto.filaInicial=fila;
	        objeto.columnaInicial=columna;
	  		  objeto.numero=numero;
	  		  return objeto;
	},
	instalarPiezas: function(juego){
  		var numero=1;
  		for (var fila = 0; fila < 3; fila++) {
  			for (var columna = 0; columna < 3; columna++) {
  				if(fila==this.espacioVacio.fila && columna==this.espacioVacio.columna) {
  					this.filas[fila][columna]=null;
  				}
  				else {
  					var pieza = this.crearPieza(numero, fila, columna);
  					juego.append(pieza.pieza);
  					this.filas[fila][columna]=pieza;
  					numero++;
  				}
  			}
  		}
 	  }, 
    moverHaciaAbajo:function(){
     	if(this.espacioVacio.fila-1 > -1)
      {
     		var filaOrigen = this.espacioVacio.fila-1;
	     	var columnaOrigen = this.espacioVacio.columna;
		    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
     	}     	
    },
    moverHaciaArriba:function(){
    	if(this.espacioVacio.fila+1 < this.filas.length)
      {
			  var filaOrigen = this.espacioVacio.fila+1;
	     	var columnaOrigen = this.espacioVacio.columna;
	    	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    	}
     	
    },
    moverHaciaLaDerecha:function(){
    	if(this.espacioVacio.columna-1 > -1)
      {
    		var filaOrigen = this.espacioVacio.fila;
	     	var columnaOrigen = this.espacioVacio.columna-1;
	    	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    	}
     	
    },
    moverHaciaLaIzquierda:function(){
    	if(this.espacioVacio.columna+1 < this.filas.length)
      {
    		var filaOrigen = this.espacioVacio.fila;
	     	var columnaOrigen = this.espacioVacio.columna+1;
	    	this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    	}
    },
    capturarTeclas:function(){
        var that=this;
      	$(document).keydown(function(a){
        	switch(a.which){
        		case 38:
            		that.moverHaciaArriba();
           			break;
          		case 39:
            		that.moverHaciaLaDerecha();
            		break;
          		case 40:
            		that.moverHaciaAbajo();           		
            		break;
          		case 37:
            		that.moverHaciaLaIzquierda();
            		break;
        	}
        	that.chequearSiGano();
        })
    }, 
 	  moverFichaFilaColumna:function(fila,columna){
      	var ficha = this.filas[fila][columna];
      	ficha.pieza.css({
        top:this.espacioVacio.fila*200,
        left:this.espacioVacio.columna*200
      });
    },
    guardarEspacioVacio:function(fila, columna){
	      var filaVacia = this.espacioVacio.fila;
	      var columnaVacia = this.espacioVacio.columna;
	      this.filas[filaVacia][columnaVacia] = this.filas[fila][columna];
      	this.filas[fila][columna]=null;
    	  this.espacioVacio.fila=fila;
      	this.espacioVacio.columna=columna;
    },
    intercambiarPosicionConEspacioVacio:function(fila, columna){
    	  var identificarFicha = this.filas[fila][columna];
      	this.moverFichaFilaColumna(fila,columna);
      	this.guardarEspacioVacio(fila,columna);
    },
    mezclarFichas:function(veces){
  		if (veces <= 0)
  		{
  			return;
  		}
  		var that=this;
  		var lista=["moverHaciaAbajo","moverHaciaArriba","moverHaciaLaIzquierda","moverHaciaLaDerecha"];
  		var numeroAleatorio=Math.floor(Math.random()*4);
  		var funcion = lista[numeroAleatorio];
  		this[funcion]();
  		setTimeout(function(){
  			that.mezclarFichas(veces-1);
  		},10)
	 },
    chequearSiGano:function(){
      var gano = false;
      for (var fila=0; fila<3; fila++) {
        for (var columna=0; columna<3; columna++) {
          if(!(fila === this.espacioVacio.fila && columna === this.espacioVacio.columna)){
            var pieza = this.filas[fila][columna];
            if(fila === pieza.filaInicial && columna === pieza.columnaInicial)
            {
              gano = true;
            }
            else
            {
              return;
            }
          }
        }
      }
      if(gano === true){
        swal("Felicitaciones","Ganaste","success");
      }
    },
	  iniciar:function(juego){
    	console.log(juego);
    	this.instalarPiezas(juego);
    	this.capturarTeclas();
    	this.mezclarFichas(100);
	}	
};

$(document).ready(function(){
	var $juego = $("#juego");
  	juego.iniciar($juego);
});