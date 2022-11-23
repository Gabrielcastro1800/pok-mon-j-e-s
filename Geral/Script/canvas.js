
var canvas = document.getElementById("inicio");
var ctx = canvas.getContext("2d");
var img1 = new Image();
var img2 = new Image();
var img3 = new Image();
var count = 1;
var choose = 1;
var message = "Use as setas <- e -> para decidir o pokémon e 'enter' para selecionar!";
var poke = "";
var escolha = false;
var yn = 0;

addEventListener("keyup", function(){
    if(event.keyCode === 39)
    {
        right();
    }
    if(event.keyCode === 37)
    {
        left();
    }

    switch(choose){
        case 1:
            poke = "Bulbassaur";
            break;
        case 2:
            poke = "Charmander";
            break;
        case 3:
            poke = "Squirtle";
    }

    if(event.keyCode === 13)
    {
        enter();
    }
});

function left(){
    if(!escolha){
        count-=2;
        choose--;
        if(count<1){
            choose=3;
            count = 5;
        }
    }else{
        yn--;
        if(yn<0){
            yn=1;
        }
    }
}

function right(){
    if(!escolha){
        count+=2;
        choose++;
        if(count>5){
            choose=1;
            count = 1;
        }
    }else{
        yn++;
        if(yn>1){
            yn=0;
        }
    }
}

function enter(){
    if(!escolha){
        message = "Tem certeza que deseja escolher "+poke;
        escolha = true;
    }else{
        if(yn==1){
            message = "Use as setas <- e -> para decidir o pokémon e 'enter' para selecionar!";
            escolha = false;
        }else{

        }
    }
}

function draw(){
    ctx.clearRect(0, 0, 800, 500);

    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = "30px Arial";
    ctx.fillText("Escolha o Pokémon inicial:", 400, 50);
    ctx.font = "20px Arial";
    ctx.textAlign = "start";
    ctx.fillText(message, 50, 300);

    if(!escolha){
        ctx.fillStyle = "rgb(184,241,112)";
        ctx.fillRect(50+(100*count), 100, 100, 100);
    }else{
        ctx.fillStyle = "rgb(184,241,112)";
        ctx.fillRect(45+(100*yn), 328, 50, 30);

        ctx.fillStyle = "black";
        ctx.fillText("Sim", 50, 350);
        ctx.fillText("Não", 150, 350);
    }

    img1.src = "Images/Sprites/1.png";
    ctx.drawImage(img1, 150, 100, 100, 100);
    img2.src = "Images/Sprites/4.png";
    ctx.drawImage(img2, 350, 100, 100, 100);
    img3.src = "Images/Sprites/7.png";
    ctx.drawImage(img3, 550, 100, 100, 100);
    requestAnimationFrame(draw);
}

draw();