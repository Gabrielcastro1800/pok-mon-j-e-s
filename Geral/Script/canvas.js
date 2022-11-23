
var canvas = document.getElementById("inicio");
var ctx = canvas.getContext("2d");
var img1 = new Image();
var img2 = new Image();
var img3 = new Image();
var count = 1;
var choose = 0;

ctx.textAlign = "center";
ctx.font = "30px Arial";
ctx.fillText("Escolha o Pokémon inicial:", 400, 50);

addEventListener("keyup", function(){
    if(event.keyCode === 39)
    {
        count+=2;
        choose++;
        if(count>5){
            choose=1;
            count = 1;
        }
    }
    if(event.keyCode === 37)
    {
        count-=2;
        choose--;
        if(count<1){
            choose=3;
            count = 5;
        }
    }

    if(event.keyCode === 13)
    {
        
    }
});

function draw(){
    ctx.clearRect(0, 100, 800, 500);
    ctx.fillStyle = "rgb(184,241,112)";

    ctx.fillRect(100*count, 100, 100, 100);
    img1.src = "Images/Sprites/1.png";
    ctx.drawImage(img1, 100, 100, 100, 100);
    img2.src = "Images/Sprites/4.png";
    ctx.drawImage(img2, 300, 100, 100, 100);
    img3.src = "Images/Sprites/7.png";
    ctx.drawImage(img3, 500, 100, 100, 100);
    requestAnimationFrame(draw);
}

draw();