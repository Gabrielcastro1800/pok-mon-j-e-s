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
var vspng = new Image();
var barpng = new Image();
var count = 1;
var choose = 1;
var message = "Use as setas <- e -> para decidir o pokémon e 'enter' para selecionar!";
var poke = "";
var escolha = false;
var yn = 0;
var fob = 1; //fob = fight or bag

//transição
var tela = 1;
var spr1 = new Image();
var spr2 = new Image();

//batalha
var pokeatual, meunvl, vida, maxvida, inimigoatual, ininvl, inivida, maxinivida, Statusg=[], pokes=[];
pokes = [0,"Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];
maxvida = 100;
maxinivida = 100;
vida = maxvida;
inivida = maxinivida;
ctx.imageSmoothingEnabled = false

//teclas pressionadas
addEventListener("keyup", function(){
    if(event.keyCode === 39)
    {
        if(tela == 1){
        right();}
        if(tela == 3){
            righttela3()
        }
        
    }
    if(event.keyCode === 37)
    {
        if(tela == 1){
        left();}
        if(tela == 3){
            lefttela3()
        }
    }

    if(event.keyCode === 13)
    {
        if(tela == 1 || tela == 2){
        enter();}
        if(tela == 3){
            
        }
    }
});

//se apertar pra esquerda, executar
function lefttela3(){
    fob = fob+1
    if(fob > 2)
    {
        fob = 1
    }
}
function righttela3(){
    fob = fob-1
    if(fob == 0)
    {
        fob = 2
    }
}
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
    if(tela==1){
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
    }else if(tela ==2){
        tela = 3;
    }
}

//desenha tudo na tela
function draw(){
    //Se for a tela 1 ele vai desenhar isso
    if(tela == 1){
        ctx.clearRect(0, 0, 800, 500);
        //desenhar fundo
        back.src = "Images/fundo/lab.png"
        ctx.drawImage(back, -90, -150, back.width*6, back.height*6);

        //desenhar titulo
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        chat.src = "Images/fundo/chat.png";
        ctx.drawImage(chat, 180, 15, 450, 45);
        ctx.fillText("Escolha o Pokémon inicial:", 400, 50);

        //desenhar mensagem
        ctx.font = "20px Arial";
        ctx.textAlign = "start";
        ctx.drawImage(chat, 2, 270, 720, 45);
        ctx.fillText(message, 50, 300);

        //sim ou não
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

        //desenhar pokemons
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
    //Se for a tela 2 ele vai desenhar isso
    if(tela == 2){
        ctx.clearRect(0, 0, 800, 500);
        //Desenha os pokemons
        spr1.src = "Images/Sprites/"+pokeatual+".png";
        ctx.save();
        ctx.translate(350, 120);
        ctx.scale(-1, 1);
        ctx.drawImage(spr1, 0, 0, 350, 350);
        ctx.restore();
        spr2.src = "Images/Sprites/"+inimigoatual+".png";
        ctx.drawImage(spr2, 450, 120, 350, 350);
        //desenhar versus
        vspng.src ="Images/fundo/vs.png"
        ctx.drawImage(vspng,230,100)

        //desenha a mensagem
        ctx.fillStyle = "black";
        ctx.textAlign = "start";
        ctx.font = "25px Arial";
        chat.src = "Images/fundo/chat.png";
        ctx.drawImage(chat, 17, 20, 500, 45);
        ctx.fillText("Aperte 'Enter' para começar a batalha!", 50, 50);
    }
    //Se for a tela 3 ele vai desenhar isso
    if(tela==3){
        ctx.clearRect(0, 0, 800, 500)
        //desenhar pokémons
        spr1.src = "Images/Sprites/"+pokeatual+".png";
        ctx.save();
        ctx.translate(300, 120);
        ctx.scale(-1, 1);
        ctx.drawImage(spr1, 0, 0, 200, 200);
        ctx.restore();
        spr2.src = "Images/Sprites/"+inimigoatual+".png";
        ctx.drawImage(spr2, 500, 120, 200, 200);
        

        //desenhar barras de vida
        ctx.fillStyle = "black";
        ctx.fillRect(30, 20, 200, 15);
        ctx.fillStyle = "rgb(184,241,142)";
        ctx.fillRect(30, 20, 200*vida/maxvida, 15);
        ctx.fillStyle = "black";
        ctx.fillRect(770, 20, -200, 15);
        ctx.fillStyle = "rgb(184,241,142)";
        ctx.fillRect(770, 20, -200*inivida/maxinivida, 15);
        ctx.drawImage(chat,0,300,800,150)
        if(fob == 1){
            ctx.fillRect(100, 370,60,50);
        }
        if(fob == 2){
            ctx.fillRect(250, 370,60,50);
        }
        ctx.fillStyle = "black";
        ctx.fillText("Fight", 100, 400);
        ctx.fillText("Bag", 250, 400);

    }
    requestAnimationFrame(draw);
}

draw()