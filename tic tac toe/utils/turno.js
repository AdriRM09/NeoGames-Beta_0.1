function turno(player1){

    if(player1 === true){
        const img_player1 = document.getElementById("img_player1");
        img_player1.src = "./images/play.png";
        img_player1.style.width = '120%';

        const img_player2 = document.getElementById("img_player2");
        img_player2.src = "./images/wait.png";
        img_player2.style.width = '80%';

        document.getElementById("player1_title").style.fontSize = '30px';
        document.getElementById("player2_title").style.fontSize = '18px';
    }
    else {
        const img_player1 = document.getElementById("img_player1");
        img_player1.src = "./images/wait.png";
        img_player1.style.width = '80%';

        const img_player2 = document.getElementById("img_player2");
        img_player2.src = "./images/play.png";
        img_player2.style.width = '120%';

        document.getElementById("player1_title").style.fontSize = '18px';
        document.getElementById("player2_title").style.fontSize = '30px';
    }
}

export default turno;