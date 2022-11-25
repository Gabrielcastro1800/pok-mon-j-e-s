function damage(nvl, atk, atkpower, dfs, type, poke){
    var multi = 1;
    var table = [
        [1,1,1,1,1,1,1,1,1,1,1,1,0.5,0,1,1,0.5,1],
        [1,0.5,0.5,1,2,2,1,1,1,1,1,2,0.5,1,0.5,1,2,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],];

        for(var i=0;i<tipos[poke].length;i++){
            multi = multi*table[type][tipos[poke][i]];
        }

    return ((((2*nvl/5+2)*atk*atkpower/dfs)/50)+2)*multi;
}
//attacks
function Splash(pok){
    bmessage = "Nada aconteceu!";
}

function Tackle(pok, bol){
    var power = 40;
    var type = 0;
    if(bol==0){
        var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
        var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
        var damg = damage(meunvl, atk, power, dfs, type, pokeatual);
        inivida-=damg;
        if(inivida<0){
            inivida=0;
        }
    }else if(bol==1){
        var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
        var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
        var damg = damage(ininvl, atk, power, dfs, type, inimigoatual);
        vida-=damg;
        if(vida<0){
            vida=0;
        }
    }
    bmessage = pokes[pok]+" levou "+damg.toFixed(0)+" de dano!";
}

function LeechSeed(pok){

}

function PoisonPowder(pok){

}
function RazorLeaf(pok){

}

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
var potionpng = new Image();
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
var pokeatual, meunvl, vida, maxvida, inimigoatual, ininvl, inivida, maxinivida, Statusg=[], pokes=[], moves=[], tipos=[];
var yatk = 0;
var xatk = 0;
var bmessage;
var battlemode = 0;
var xplayer = 300;
var xini = 500;
var click;
var inimigoatk = 0;
pokes = [0,"Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];
//moves: parou no Bulbasaur
moves = [0,[Tackle, LeechSeed, PoisonPowder, RazorLeaf],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],
[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0]];
//status: parou no Wartotle
Statusg = [0,[45,49,49,65,65,45],[60,62,63,80,80,60],[80,82,83,100,100,80],[39,52,43,60,50,65],[58,64,58,80,65,80],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],
[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50]]
//Types
tipos=[0,[4,7],[4,7],[4,7],[1],[1],[1,9],[2],[2],[2],[11],[11],[11,9],[11,7],[11,7],[11,7],[0,9],[0,9],[0,9],[0],[0],[0,9],[0,9],[7],[7],[3],[3],[8],[8],[7],[7],[7,8],[7],[7],[7,8],[17],[17],[1],[1],[0,17],[0,17],[7,9],[7,9],[4,7],[4,7],[4,7],[11,4],[11,4],[11,7],[11,7],[8],[8],[0],[0],[2],[2],[6],[6],[1],[1],[2],[2],[2,6],[10],[10],[10],[6],[6],[6],[4,7],[4,7],[4,7],[2,7],[2,7],[12,6],[12,6],[12,6],[1],[1],[2,10],[2,10],[3,16],[3,16],[0,9],[0,9],[0,9],[2],[2,5],[7],[7],[2],[2,5],[13,7],[13,7],[13,7],[12,8],[10],[10],[2],[2],[3],[3],[4,10],[4,10],[8],[8],[6],[6],[0],[7],[7],[8,12],[8,12],[0],[4],[0],[2],[2],[2],[2],[2],[2,10],[10,17],[9,11],[5,10],[3],[1],[11],[0],[2],[2,9],[2,5],[0],[0],[2],[3],[1],[0],[12,2],[12,2],[12,2],[12,2],[12,9],[0],[5,9],[3,9],[1,9],[14],[14],[14,9],[10],[10]];

meunvl = 5;
ininvl = 5;
click = 0;

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
    if(event.keyCode === 38)
    {
        up();
    }
    if(event.keyCode === 40)
    {
        down();
    }

    if(event.keyCode === 13)
    {
        enter();
    }
});

//se apertar pra esquerda, executar
function left(){
    if(tela==1){
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
    }else if(tela==3){
        if(battlemode==0){
            fob = fob+1;
            if(fob > 2)
            {
                fob = 1;
            }
        }else if(battlemode==1){
            if(xatk==1){
                xatk=0;
            }else{
                xatk=1;
            }
        }
    }
}

//se apertar pra direita, executar
function right(){
    if(tela==1){
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
    }else if(tela==3){
        if(battlemode==0){
            fob = fob-1
            if(fob == 0)
            {
                fob = 2
            }
        }else if(battlemode==1){
            if(xatk==1){
                xatk=0;
            }else{
                xatk=1;
            }
        }
    }
}

//se apertar pra cima, executar
function up(){
    if(tela==3){
        if(battlemode==1){
            if(yatk==1){
                yatk=0;
            }else{
                yatk=1;
            }
        }
    }
}

//se apertar pra baixo, executar
function down(){
    if(tela==3){
        if(battlemode==1){
            if(yatk==1){
                yatk=0;
            }else{
                yatk=1;
            }
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
    }else if(tela==2){
        tela = 3;
        maxvida = ((50+2*Statusg[pokeatual][0])*meunvl/100)+10+meunvl;
        maxinivida = ((50+2*Statusg[inimigoatual][0])*ininvl/100)+10+ininvl;;
        vida = maxvida;
        inivida = maxinivida;
    }else if(tela==3){
        if(battlemode==0){
            if(fob==1){
                battlemode=1;
            }
        }else if(battlemode==1){
            if(xatk==0 && yatk==0){
                bmessage = pokes[pokeatual]+" usou "+moves[pokeatual][0].name;
            }else if(xatk==1 && yatk==0){
                bmessage = pokes[pokeatual]+" usou "+moves[pokeatual][1].name;
            }else if(xatk==0 && yatk==1){
                bmessage = pokes[pokeatual]+" usou "+moves[pokeatual][2].name;
            }else if(xatk==1 && yatk==1){
                bmessage = pokes[pokeatual]+" usou "+moves[pokeatual][3].name;
            }
            battlemode=2;
        }else if(battlemode==2){
            click++;
            if(click == 1){
                if(xatk==0 && yatk==0){
                    moves[pokeatual][0](inimigoatual, 0);
                }else if(xatk==1 && yatk==0){
                    moves[pokeatual][1](inimigoatual, 0);
                }else if(xatk==0 && yatk==1){
                    moves[pokeatual][2](inimigoatual, 0);
                }else if(xatk==1 && yatk==1){
                    moves[pokeatual][3](inimigoatual, 0);
                }
            }else if(click==2){
                if(inivida==0){
                    tela = 2;
                    battlemode=0;
                    bmessage = "";
                    inimigoatual = Math.ceil(Math.random()*151);
                    click=0;
                }else{
                    do{
                        inimigoatk = Math.floor(Math.random()*3);
                    }while(moves[inimigoatual][inimigoatk]==0);
                    bmessage = pokes[inimigoatual]+" usou "+moves[inimigoatual][inimigoatk].name;
                }
            }else if(click == 3){
                    moves[inimigoatual][inimigoatk](pokeatual, 1);
            }else if(click == 4){
                click=0;
                battlemode = 0;
            }
        }
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

        //desenha a mensagem
        ctx.fillStyle = "black";
        ctx.textAlign = "start";
        ctx.font = "25px Arial";
        chat.src = "Images/fundo/chat.png";
        ctx.drawImage(chat, 17, 20, 500, 45);
        ctx.drawImage(chat, 17, 70, 530, 45);
        ctx.fillText("Aperte 'Enter' para começar a batalha!", 50, 50);
        ctx.fillText("Ou Aperte 'Backspace' para ir a lojinha!", 50, 100);
    }
    //Se for a tela 3 ele vai desenhar isso
    if(tela==3){
        ctx.clearRect(0, 0, 800, 500)
        //desenhar pokémons
        spr1.src = "Images/Sprites/"+pokeatual+".png";
        ctx.save();
        ctx.translate(xplayer, 120);
        ctx.scale(-1, 1);
        ctx.drawImage(spr1, 0, 0, 200, 200);
        ctx.restore();
        spr2.src = "Images/Sprites/"+inimigoatual+".png";
        ctx.drawImage(spr2, xini, 120, 200, 200);
        

        //desenhar barras de vida
        ctx.textAlign = "start";
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillRect(30, 20, 200, 15);
        ctx.fillText("Nvl: "+meunvl, 30, 50);
        ctx.fillStyle = "rgb(184,241,142)";
        ctx.fillRect(30, 20, 200*vida/maxvida, 15);
        ctx.fillStyle = "black";
        ctx.fillRect(770, 20, -200, 15);
        ctx.fillText("Nvl: "+ininvl, 730, 50);
        ctx.fillStyle = "rgb(184,241,142)";
        ctx.fillRect(770, 20, -200*inivida/maxinivida, 15);

        ctx.drawImage(chat,0,350,800,150);
        if(battlemode==0){
            ctx.fillStyle = "rgb(184,241,142)";
            if(fob == 1){
                ctx.fillRect(515, 370,80,40);
            }
            if(fob == 2){
                ctx.fillRect(645, 370,100,40);
            }
            ctx.fillStyle = "black";
            ctx.textAlign = "start";
            ctx.font = "25px Arial";
            ctx.fillText("Lutar", 520, 400);
            ctx.fillText("Mochila", 650, 400);

            ctx.fillStyle = "black";
            ctx.fillText("O que o "+pokes[pokeatual]+" vai fazer?", 80, 400);
        }else if(battlemode==1){
            ctx.fillStyle = "rgb(184,241,142)";
            ctx.fillRect(90+(200*xatk), 370+(50*yatk),180,40);

            ctx.fillStyle = "black";
            ctx.textAlign = "start";
            ctx.font = "25px Arial";
            if(moves[pokeatual][0]!=0){
                ctx.fillText(moves[pokeatual][0].name, 100, 400);
            }
            if(moves[pokeatual][1]!=0){
                ctx.fillText(moves[pokeatual][1].name, 300, 400);
            }
            if(moves[pokeatual][2]!=0){
                ctx.fillText(moves[pokeatual][2].name, 100, 450);
            }
            if(moves[pokeatual][3]!=0){
                ctx.fillText(moves[pokeatual][3].name, 300, 450);
            }

        }else if(battlemode==2){
            ctx.fillStyle = "black";
            ctx.textAlign = "start";
            ctx.font = "25px Arial";
            ctx.fillText(bmessage, 80, 400);
        }
    }
    if(tela == 4){
        ctx.clearRect(0,0,800,500)
        potionpng.src = "Images/fundo/potion.png";
        ctx.drawImage(potionpng,0,100,100,100)

    }
    requestAnimationFrame(draw);
}

draw()
