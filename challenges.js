
var scores, roundScore, activePlayer, dice, gameplaying;


init();


//event type 
document.querySelector('.btn-roll').addEventListener('click',function(){
   
    if(gameplaying){
        
    //1. Random number
    //Numero entre 1 y 6
    var dice = Math.floor(Math.random() * 6)+1;
    var dice1 = Math.floor(Math.random() * 6)+1;
   
        
    //2. Display the result
    document.getElementById('dice-1').style.display = "block";  
    document.getElementById('dice-2').style.display = "block";  
        
   
    document.getElementById('dice-1').src = 'dice-' +dice+ '.png';
    document.getElementById('dice-2').src = 'dice-' +dice1+ '.png';
    
    
    //3. Update the round IF the rolled number was NOT a 1.
    if (dice !== 1 && dice1 !== 1){
        //Add score
        roundScore += dice+dice1;
        document.querySelector('#current-'+activePlayer).textContent = roundScore;
        
    }else{
     
        nextPlayer();
    }
    
    }
    
    
  
    
});


document.querySelector('.btn-hold').addEventListener('click',function(){
   
    if(gameplaying){
        //add current score to global score
    scores[activePlayer] += roundScore;
    
    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    var input = document.querySelector('.final-score').value;
    
    var finalscore = (input) ? input : 100;
        
    //ckeck if player won the game
    if(scores[activePlayer] >= finalscore){
        document.querySelector("#name-" + activePlayer).textContent = "Winner!";
        
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
        
        document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
        gameplaying = false;
        
    }else{
        //Next Player
        nextPlayer(); 
    }
    
    }
    
    

    
});

function nextPlayer(){
       // Next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        //Cambiar el atributo active para el otro turno
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        
        //uso toogle que es mas facil, si existe lo quita y si no existe lo pone.
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //document.querySelector('.dice').style.display = 'none';
}

function init(){
    
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;  
    gameplaying = true; 
    previousDice = 0;
    
    //Formas de setear un valor html solamente por texto o poniendole html adicional.
    //document.querySelector('#current-' + activePlayer).textContent = dice;
    //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
    //var x = document.querySelector('#score-0').textContent;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    
    document.querySelector('.player-0-panel').classList.remove('winner');
     document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
     document.querySelector('.player-0-panel').classList.add('active');
     document.querySelector('.player-1-panel').classList.remove('active');
    
}


document.querySelector('.btn-new').addEventListener('click', init);