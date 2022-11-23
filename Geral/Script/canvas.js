//inicio
var canvas = document.getElementById("inicio");
var ctx = canvas.getContext("2d");
var img1 = new Image();
var img2 = new Image();
var img3 = new Image();
var back = new Image();
var chat = new Image();
var poke1 = new Image();
var poke2 = new Image();
var count = 1;
var choose = 1;
var message = "Use as setas <- e -> para decidir o pokémon e 'enter' para selecionar!";
var poke = "";
var escolha = false;
var yn = 0;

//transição
var tela = 1;
var spr1 = new Image();
var spr2 = new Image();

//batalha
var pokeatual, meunvl, inimigoatual, ininvl, Statusg=[], pokes=[];
pokes = [0,"Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];


ctx.imageSmoothingEnabled = false

//teclas pressionadas
addEventListener("keyup", function(){
    if(event.keyCode === 39)
    {
        right();
    }
    if(event.keyCode === 37)
    {
        left();
    }

    if(event.keyCode === 13)
    {
        enter();
    }
});

//se apertar pra esquerda, executar
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

//se apertar pra direita, executar
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

//se apertar enter, executar
function enter(){
    if(!escolha){
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
        message = "Tem certeza que deseja escolher "+poke;
        escolha = true;
    }else{
        if(yn==1){
            message = "Use as setas <- e -> para decidir o pokémon e 'enter' para selecionar!";
            escolha = false;
        }else{
            tela = 2;
            if(choose == 1){
                pokeatual = 1;
            }else if(choose == 2){
                pokeatual = 4;
            }else if(choose == 3){
                pokeatual = 7;
            }
            inimigoatual = Math.ceil(Math.random()*151);
            escolha = false;
        }
    }
}

//desenha tudo na tela
function draw(){
    if(tela == 1){
        ctx.clearRect(0, 0, 800, 500);
        back.src = "Images/fundo/lab.png"
        ctx.drawImage(back, -90, -150, back.width*6, back.height*6);

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        chat.src = "Images/fundo/chat.png";
        ctx.drawImage(chat, 180, 15, 450, 45);
        ctx.fillText("Escolha o Pokémon inicial:", 400, 50);

        ctx.font = "20px Arial";
        ctx.textAlign = "start";
        ctx.drawImage(chat, 2, 270, 720, 45);
        ctx.fillText(message, 50, 300);

        if(!escolha){
            ctx.fillStyle = "rgb(184,241,112)";
            poke1.src = "Images/fundo/poke1.png";
            ctx.drawImage(poke1,50+(100*count), 100, 100, 100);
        }else{
            ctx.fillStyle = "rgb(184,241,112)";
            ctx.fillRect(45+(100*yn), 328, 50, 30);

            ctx.fillStyle = "black";
            ctx.fillText("Sim", 50, 350);
            ctx.fillText("Não", 150, 350);
        }
        poke2.src = "Images/fundo/poke2.png"

        if(choose != 1 || escolha){ctx.drawImage(poke2, 150, 100, 100, 100);}
        img1.src = "Images/Sprites/1.png";
        ctx.drawImage(img1, 150, 100, 100, 100);
        if(choose != 2 || escolha){ctx.drawImage(poke2, 350, 100, 100, 100);}
        img2.src = "Images/Sprites/4.png";
        ctx.drawImage(img2, 350, 100, 100, 100);
        if(choose != 3 || escolha){ctx.drawImage(poke2, 550, 100, 100, 100);}
        img3.src = "Images/Sprites/7.png";
        ctx.drawImage(img3, 550, 100, 100, 100);
    }
    if(tela == 2){
        ctx.clearRect(0, 0, 800, 500)
        spr1.src = "Images/Sprites/"+pokeatual+".png";
        ctx.drawImage(spr1, 10, 200, 400, 400);
    }
    requestAnimationFrame(draw);
}

draw()