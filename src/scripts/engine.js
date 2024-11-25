const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        vidas: document.querySelector("#vidas")
    },
    values:{
        // gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
        numeroDeVidas: 3,
        erro: 0
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimeId: setInterval(countDown, 1000)
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    
    if(state.values.currentTime <= 0 || state.values.numeroDeVidas === 0) {
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timerId);
        state.values.result = state.values.result + state.values.numeroDeVidas * 3;
        alert("GAME OVER! O seu resultado foi: " + state.values.result);
        location.reload();
    }
}

function playSound (audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};

// function moveEnemy(){
    // state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
// }

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
            else{
                perdeVida();
                state.values.hitPosition = null;
                playSound("erro");
            }
        });
    });
}

function perdeVida() {
    state.values.erro++;   
        if(state.values.erro === 3){
            state.values.numeroDeVidas--;
            state.view.vidas.textContent = "x" + state.values.numeroDeVidas;
            state.values.erro = 0;
        }
    }

function initialize() { 
    // moveEnemy();
    addListenerHitBox();
}

initialize();