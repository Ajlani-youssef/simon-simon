var cycle = [] ;
var compteur = 0 ;
var b1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var b2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var b3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var b4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
startGame();                                                                                       // tel

function startGame(){
	cycle.push("b"+Math.floor(Math.random()*4 + 1));
	document.getElementById("start").style.display = "none" ;
	setTimeout(function(){ 
		clignote();
		document.getElementById("bravo").innerHTML = "brav" ;
		document.getElementById("bravo").style.display = "none" ;
		document.getElementById("perdu").style.display = "none" ;
	}, 500);
}



function restart() {
	document.getElementById("score").innerHTML = "0" ;
	cycle = [] ;
}



function clignote(){
	var interval;
	var j = 0;
	interval = setInterval(function( ){
		if( j < cycle.length ){
			id = cycle[j++];
			document.getElementById(id).style.opacity = "1" ;
			switch(id){
				case "b1" : b1.play(); break ;
				case "b2" : b2.play(); break ;
				case "b3" : b3.play(); break ;
				case "b4" : b4.play(); break ;
			}
			setTimeout(function(){ document.getElementById(id).style.opacity = "0.5" ; }, 450);
		} else {
			setTimeout(function(){ 
				let bouton = document.getElementsByClassName("bouton");
				for(let i=0 ; i<bouton.length ;i++){
					bouton[i].addEventListener('click' , allume );
					bouton[i].addEventListener('touchstart' , allumeTel );                              //tel
				}
			 }, 450);
			clearInterval(interval);
		}
	},1000, j ,interval )
}

function allumeTel(e){                                                                      //tel
	if(compteur < cycle.length){
		e.targetTouches[0].style.opacity = "1" ;
		switch(e.targetTouches[0].getAttribute('id')){
				case "b1" : b1.play(); break ;
				case "b2" : b2.play(); break ;
				case "b3" : b3.play(); break ;
				case "b4" : b4.play(); break ;
			}
		bravo = document.getElementById("bravo") ;
		bravo.style.display = "block";
		bravo.innerHTML+="o";
		setTimeout(function(){ e.targetTouches[0].style.opacity = "0.5" ; }, 450);
		if(e.targetTouches[0].getAttribute('id') != cycle[compteur]){
			compteur = 0 ;
			perdu();
		} else { 
			compteur++ ;
			if(compteur == cycle.length){ 
				repeat();
				incrementScore();
				startGame();
			}
		}
	}
}

function allume(e){
	if(compteur < cycle.length){
		e.target.style.opacity = "1" ;
		switch(e.target.getAttribute('id')){
				case "b1" : b1.play(); break ;
				case "b2" : b2.play(); break ;
				case "b3" : b3.play(); break ;
				case "b4" : b4.play(); break ;
			}
		bravo = document.getElementById("bravo") ;
		bravo.style.display = "block";
		bravo.innerHTML+="o";
		setTimeout(function(){ e.target.style.opacity = "0.5" ; }, 450);
		if(e.target.getAttribute('id') != cycle[compteur]){
			compteur = 0 ;
			perdu();
		} else { 
			compteur++ ;
			if(compteur == cycle.length){ 
				repeat();
				incrementScore();
				startGame();
			}
		}
	}
}



function perdu(){
	perdu = document.getElementById("perdu") ;
	perdu.style.display = "block";
	restart();
	startGame();
}



function repeat(){
	compteur = 0 ;
	let bouton = document.getElementsByClassName("bouton");
	for(let i=0 ; i<bouton.length ;i++){
		bouton[i].removeEventListener('click' , allume );
		bouton[i].removeEventListener('touchstart' , allumeTel );                                                    //tel
	}
}



function incrementScore()
{
	score = document.getElementById("score");
	score.innerHTML = score.innerHTML*1 + 1 ;
	score = document.getElementById("votreScore");
	score.style.color = "red" ;
	setTimeout(function(){ score.style.color = "black"  ; }, 1000);
}


