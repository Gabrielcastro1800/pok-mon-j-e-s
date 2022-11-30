function damage(nvl, atk, atkpower, dfs, type, poke, s, bol){
    var multi = 1;
    var boostdfs = 1;
    var boostatk = 1;
    var table = [
        [1,1,1,1,1,1,1,1,1,1,1,1,0.5,0,1,1,0.5,1],
        [1,0.5,0.5,1,2,2,1,1,1,1,1,2,0.5,1,0.5,1,2,1],
        [1,2,0.5,1,0.5,1,1,1,2,1,1,1,2,1,0.5,1,1,1],
        [1,1,2,0.5,0.5,1,1,1,0,2,1,1,1,1,0.5,1,1,1],
        [1,0.5,2,1,0.5,1,1,0.5,2,0.5,1,0.5,2,1,0.5,1,0.5,1],
        [1,0.5,0.5,1,2,0.5,1,1,2,2,1,1,1,1,2,1,0.5,1],
        [2,1,1,1,1,2,1,0.5,1,0.5,0.5,0.5,2,0,1,2,2,0.5],
        [1,1,1,1,2,1,1,0.5,0.5,1,1,1,0.5,0.5,1,1,0,2],
        [1,2,1,2,0.5,1,1,2,1,0,1,0.5,2,1,1,1,2,1],
        [1,1,1,0.5,2,1,2,1,1,1,1,2,0.5,1,1,1,0.5,1],
        [1,1,1,1,1,1,2,2,1,1,0.5,1,1,1,1,0,0.5,1],
        [1,0.5,1,1,2,1,0.5,0.5,1,0.5,2,1,1,0.5,1,2,0.5,0.5],
        [1,2,1,1,1,2,0.5,1,0.5,2,1,2,1,1,1,1,0.5,1],
        [0,1,1,1,1,1,1,1,1,1,2,1,1,2,1,0.5,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,0.5,0],
        [1,1,1,1,1,1,2,1,1,1,2,1,1,2,1,0.5,1,0.5],
        [1,0.5,0.5,0.5,1,2,1,1,1,1,1,1,2,1,1,1,0.5,2],
        [1,0.5,1,1,1,1,2,0.5,1,1,1,1,1,1,2,2,0.5,1]];

        for(var i=0;i<tipos[poke].length;i++){
            multi = multi*table[type][tipos[poke][i]];
        }

        if(bol == 1){
            for(var i=0;i<mboost[1+s*2];i++){
                boostdfs+=0.5;
            }
            for(var i=0;i<iboost[0+s*2];i++){
                boostatk+=0.5;
            }
            for(var i=0;i>mboost[1+s*2];i--){
                boostdfs=2/2-(i-1);
            }
            for(var i=0;i>iboost[0+s*2];i--){
                boostatk=2/2-(i-1);
            }
        }else if(bol == 0){
            for(var i=0;i<iboost[1+s*2];i++){
                boostdfs+=0.5;
            }
            for(var i=0;i<mboost[0+s*2];i++){
                boostatk+=0.5;
            }
            for(var i=0;i>iboost[1+s*2];i--){
                boostdfs=2/2-(i-1);
            }
            for(var i=0;i>mboost[0+s*2];i--){
                boostatk=2/2-(i-1);
            }
        }
        anim = true;
    return ((((2*nvl/5+2)*(atk*boostatk)*atkpower/(dfs*boostdfs))/50)+2)*multi;
}
//attacks
function Splash(bol, aaccuracy, baccuracy){
    bmessage = "Nada aconteceu!";
}

function Transform(bol, aaccuracy, baccuracy){
    if(bol==0){
        pokeatual = inimigoatual;
        bmessage = pokes[pokeatual]+" se transformou no "+pokes[inimigoatual];
    }else if(bol==1){
        inimigoatual = pokeatual;
        bmessage = pokes[inimigoatual]+" se transformou no "+pokes[pokeatual];
    }
}

function Teleport(bol, aaccuracy, baccuracy){
    bmessage = "Ele não consegue fugir";
}

function Metronome(bol, aaccuracy, baccuracy){
    var move;
    do{
        var randp = Math.ceil(Math.random()*151);
        var randa = Math.floor(Math.random()*4);
        move = moves[randp][randa];
    }while(move==0);
    moves[randp][randa](bol, aaccuracy, baccuracy);
    bmessage = moves[randp][randa].name+" foi usado! "+bmessage;
}

//fisicos
function Tackle(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function HornAttack(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 65;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function ViceGrip(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 55;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SelfDestruct(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 200;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            vida = 0;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            inivida = 0;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Explosion(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 250;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            vida = 0;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            inivida = 0;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function TakeDown(bol, aaccuracy, baccuracy){
    var accuracy = 0.85;
    var power = 90;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            vida-=damg/4;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            inivida-=damg/4;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function DoubleEdge(bol, aaccuracy, baccuracy){
    var accuracy = 100;
    var power = 130;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            vida-=damg/3;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            inivida-=damg/3;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Submission(bol, aaccuracy, baccuracy){
    var accuracy = 0.80;
    var power = 80;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            vida-=damg/4;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            inivida-=damg/4;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function KarateChop(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 50;
    var type = 6;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Thrash(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 120;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.6){
                mconfuso = true;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.6){
                iconfuso = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SeismicToss(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(tipos[inimigoatual][0] != 13 && tipos[inimigoatual][1] != 13){
                var damg = meunvl;
                inivida-=damg;
                bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
            }else{
                bmessage = pokes[inimigoatual]+" é imune!";
            }
        }else if(bol==1){
            if(tipos[pokeatual][0] != 13 && tipos[pokeatual][1] != 13){
                var damg = ininvl;
                vida-=damg;
                bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
            }else{
                bmessage = pokes[pokeatual]+" é imune!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function PayDay(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function LeechLife(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 80;
    var type = 11;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            vida+=damg/2;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            inivida+=damg/2;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Pound(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Peck(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 35;
    var type = 9;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function DrillPeck(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 80;
    var type = 9;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function QuickAttack(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Swift(bol, aaccuracy, baccuracy){
    var power = 60;
    var type = 0;
    if(bol==0){
        var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
        var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
        var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
        inivida-=damg;
        bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
    }else if(bol==1){
        var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
        var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
        var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
        vida-=damg;
        bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
    }
}

function Scratch(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function VineWhip(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 45;
    var type = 4;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Slam(bol, aaccuracy, baccuracy){
    var accuracy = 0.75;
    var power = 80;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function RockThrow(bol, aaccuracy, baccuracy){
    var accuracy = 0.9;
    var power = 50;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function MegaPunch(bol, aaccuracy, baccuracy){
    var accuracy = 0.85;
    var power = 80;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function MegaKick(bol, aaccuracy, baccuracy){
    var accuracy = 0.75;
    var power = 120;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Slash(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 70;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Bite(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 60;
    var type = 15;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7){
                flinch = true;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mflinch = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function BoneClub(bol, aaccuracy, baccuracy){
    var accuracy = 0.85;
    var power = 65;
    var type = 8;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                flinch = true;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mflinch = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function RollingKick(bol, aaccuracy, baccuracy){
    var accuracy = 0.85;
    var power = 60;
    var type = 6;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7){
                flinch = true
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mflinch = true
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Stomp(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 65;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7){
                flinch = true;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mflinch = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Wrap(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 15;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            iwrap = true;
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            mwrap = true;
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Bind(bol, aaccuracy, baccuracy){
    var accuracy = 0.85;
    var power = 15;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            iwrap = true;
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            mwrap = true;
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function HyperFang(bol, aaccuracy, baccuracy){
    var accuracy = 0.9;
    var power = 80;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7){
                flinch = true;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mflinch = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Headbutt(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 70;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7){
                flinch = true;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mflinch = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function DizzyPunch(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 70;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.8){
                iconfuso = true;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.8){
                mconfuso = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SuperFang(bol, aaccuracy, baccuracy){
    var accuracy = 0.9;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var damg = maxinivida/2;
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var damg = maxvida/2;
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function PoisonSting(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 15;
    var type = 7;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7 && tipos[inimigoatual][1] != 16 && tipos[inimigoatual][1] != 7 && tipos[inimigoatual][0] != 7){
                iestado = 4;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7 && tipos[pokeatual][1] != 16 && tipos[pokeatual][1] != 7 && tipos[pokeatual][0] != 7){
                mestado = 4;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function FuryAttack(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 15;
    var type = 0;
    var rand;
    var ttdano = 0;
    do{
        rand = Math.ceil(Math.random()*5);
    }while(rand < 2);
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        for(var i=0;i<rand;i++){
            if(bol==0){
                var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
                var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
                var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
                inivida-=damg;
                ttdano+=damg;
                bmessage = pokes[inimigoatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }else if(bol==1){
                var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
                var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
                var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
                vida-=damg;
                ttdano+=damg;
                bmessage = pokes[pokeatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function CometPunch(bol, aaccuracy, baccuracy){
    var accuracy = 0.85;
    var power = 18;
    var type = 0;
    var rand;
    var ttdano = 0;
    do{
        rand = Math.ceil(Math.random()*5);
    }while(rand < 2);
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        for(var i=0;i<rand;i++){
            if(bol==0){
                var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
                var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
                var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
                inivida-=damg;
                ttdano+=damg;
                bmessage = pokes[inimigoatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }else if(bol==1){
                var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
                var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
                var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
                vida-=damg;
                ttdano+=damg;
                bmessage = pokes[pokeatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Bonemerang(bol, aaccuracy, baccuracy){
    var accuracy = 0.9;
    var power = 50;
    var type = 8;
    var rand = 2;
    var ttdano = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        for(var i=0;i<rand;i++){
            if(bol==0){
                var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
                var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
                var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
                inivida-=damg;
                ttdano+=damg;
                bmessage = pokes[inimigoatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }else if(bol==1){
                var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
                var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
                var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
                vida-=damg;
                ttdano+=damg;
                bmessage = pokes[pokeatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function DoubleKick(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 30;
    var type = 6;
    var rand = 2;
    var ttdano = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        for(var i=0;i<rand;i++){
            if(bol==0){
                var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
                var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
                var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
                inivida-=damg;
                ttdano+=damg;
                bmessage = pokes[inimigoatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }else if(bol==1){
                var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
                var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
                var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
                vida-=damg;
                ttdano+=damg;
                bmessage = pokes[pokeatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function DoubleSlap(bol, aaccuracy, baccuracy){
    var accuracy = 0.85;
    var power = 15;
    var type = 0;
    var rand;
    var ttdano = 0;
    do{
        rand = Math.ceil(Math.random()*5);
    }while(rand < 2);
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        for(var i=0;i<rand;i++){
            if(bol==0){
                var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
                var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
                var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
                inivida-=damg;
                ttdano+=damg;
                bmessage = pokes[inimigoatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }else if(bol==1){
                var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
                var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
                var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
                vida-=damg;
                ttdano+=damg;
                bmessage = pokes[pokeatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function FurySwipes(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 15;
    var type = 0;
    var rand;
    var ttdano = 0;
    do{
        rand = Math.ceil(Math.random()*5);
    }while(rand < 2);
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        for(var i=0;i<rand;i++){
            if(bol==0){
                var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
                var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
                var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
                inivida-=damg;
                ttdano+=damg;
                bmessage = pokes[inimigoatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }else if(bol==1){
                var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
                var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
                var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
                vida-=damg;
                ttdano+=damg;
                bmessage = pokes[pokeatual]+" levou "+ttdano.toFixed(0)+" de dano, com "+rand+" ataques!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function BodySlam(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 85;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7){
                iestado = 3;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mestado = 3;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function HiJumpKick(bol, aaccuracy, baccuracy){
    var accuracy = 90;
    var power = 130;
    var type = 6;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
            vida-=maxvida/2;
            if(vida<0){
                vida=0;
            }
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
            inivida-=maxinivida/2;
            if(inivida<0){
                inivida=0;
            }
        }
    }
}

function Lick(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 35;
    var type = 13;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7){
                iestado = 3;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mestado = 3;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function FirePunch(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 75;
    var type = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                iestado = 1;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mestado = 1;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function ThunderPunch(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 75;
    var type = 3;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                iestado = 3;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mestado = 3;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function IcePunch(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 75;
    var type = 5;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                iestado = 2;
            }
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mestado = 2;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Earthquake(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 100;
    var type = 8;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Dig(bol, aaccuracy, baccuracy){
    if(bol==0){
        if(mwait == true){
            var accuracy = 1;
            var power = 100;
            var type = 8;
            var chance = accuracy*aaccuracy/baccuracy;
            if(Math.random()<chance){
                    var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
                    var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
                    var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 0, bol);
                    inivida-=damg;
                    bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
                    maccuracy-=1000;
            }else{
                bmessage = pokes[pokeatual]+" errou o ataque!";
            }
            mwait = false;
        }else{
            mwait = true;
            maccuracy+=1000;
            bmessage = pokes[pokeatual]+" entrou na terra!";
        }
    }else if(bol==1){
        if(iwait == true){
            var accuracy = 1;
            var power = 100;
            var type = 8;
            var chance = accuracy*aaccuracy/baccuracy;
            if(Math.random()<chance){
                    var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
                    var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
                    var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 0, bol);
                    vida-=damg;
                    bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
                    iaccuracy-=1000;
            }else{
                bmessage = pokes[inimigoatual]+" errou o ataque!";
            }
            iwait = false;
        }else{
            iwait = true;
            iaccuracy+=1000;
            bmessage = pokes[inimigoatual]+" entrou na terra!";
        }
    }
}

//status
function LeechSeed(bol, aaccuracy, baccuracy){
    var accuracy = 0.90;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            iniseed = true;
            bmessage = pokes[inimigoatual]+" foi plantado";
        }else if(bol==1){
            mseed = true;
            bmessage = pokes[pokeatual]+"  foi plantado";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function PoisonPowder(bol, aaccuracy, baccuracy){
    var accuracy = 0.75;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            if(tipos[inimigoatual][1] == 16 || tipos[inimigoatual][1] == 7 || tipos[inimigoatual][0] == 7){
                bmessage = pokes[inimigoatual]+" é imune";
            }else{
                iestado = 4;
                bmessage = pokes[inimigoatual]+" foi envenenado";
            }
        }else if(bol==1 && mestado == 0){
            if(tipos[inimigoatual][1] == 16 || tipos[inimigoatual][1] == 7 || tipos[inimigoatual][0] == 7){
                bmessage = pokes[pokeatual]+" é imune";
            }else{
                mestado = 4;
                bmessage = pokes[pokeatual]+"  foi envenenado";
            }
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function PoisonGas(bol, aaccuracy, baccuracy){
    var accuracy = 0.90;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            if(tipos[inimigoatual][1] == 16 || tipos[inimigoatual][1] == 7 || tipos[inimigoatual][0] == 7){
                bmessage = pokes[inimigoatual]+" é imune";
            }else{
                iestado = 4;
                bmessage = pokes[inimigoatual]+" foi envenenado";
            }
        }else if(bol==1 && mestado == 0){
            if(tipos[inimigoatual][1] == 16 || tipos[inimigoatual][1] == 7 || tipos[inimigoatual][0] == 7){
                bmessage = pokes[pokeatual]+" é imune";
            }else{
                mestado = 4;
                bmessage = pokes[pokeatual]+"  foi envenenado";
            }
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Toxic(bol, aaccuracy, baccuracy){
    var accuracy = 0.90;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            if(tipos[inimigoatual][1] == 16 || tipos[inimigoatual][1] == 7 || tipos[inimigoatual][0] == 7){
                bmessage = pokes[inimigoatual]+" é imune";
            }else{
                iestado = 4;
                bmessage = pokes[inimigoatual]+" foi envenenado";
            }
        }else if(bol==1 && mestado == 0){
            if(tipos[inimigoatual][1] == 16 || tipos[inimigoatual][1] == 7 || tipos[inimigoatual][0] == 7){
                bmessage = pokes[pokeatual]+" é imune";
            }else{
                mestado = 4;
                bmessage = pokes[pokeatual]+"  foi envenenado";
            }
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SleepPowder(bol, aaccuracy, baccuracy){
    var accuracy = 0.75;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            iestado = 5;
            bmessage = pokes[inimigoatual]+" está dormindo";
        }else if(bol==1 && mestado == 0){
            mestado = 5;
            bmessage = pokes[pokeatual]+"  está dormindo";
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Hypnosis(bol, aaccuracy, baccuracy){
    var accuracy = 0.6;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            iestado = 5;
            bmessage = pokes[inimigoatual]+" está dormindo";
        }else if(bol==1 && mestado == 0){
            mestado = 5;
            bmessage = pokes[pokeatual]+"  está dormindo";
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function StunSpore(bol, aaccuracy, baccuracy){
    var accuracy = 0.75;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            iestado = 3;
            bmessage = pokes[inimigoatual]+" está paralizado";
        }else if(bol==1 && mestado == 0){
            mestado = 3;
            bmessage = pokes[pokeatual]+"  está paralizado";
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Sing(bol, aaccuracy, baccuracy){
    var accuracy = 0.55;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            iestado = 5;
            bmessage = pokes[inimigoatual]+" está dormindo";
        }else if(bol==1 && mestado == 0){
            mestado = 5;
            bmessage = pokes[pokeatual]+"  está dormindo";
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function ThunderWave(bol, aaccuracy, baccuracy){
    var accuracy = 0.9;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 0){
            iestado = 3;
            bmessage = pokes[inimigoatual]+" está paralizado";
        }else if(bol==1 && mestado == 0){
            mestado = 3;
            bmessage = pokes[pokeatual]+"  está paralizado";
        }else{
            bmessage = "Não rolou";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Harden(bol, aaccuracy, baccuracy){
    if(bol==0){
        if(mboost[1]<6){
            mboost[1]+=1;
            bmessage = pokes[pokeatual]+" endureceu";
        }else{
            bmessage = pokes[pokeatual]+" endureceu o limite";
        }
    }else if(bol==1){
        if(iboost[1]<6){
            iboost[1]+=1;
            bmessage = pokes[inimigoatual]+" endureceu";
        }else{
            bmessage = pokes[inimigoatual]+" endureceu o limite";
        }
    }
}

function Withdraw(bol, aaccuracy, baccuracy){
    if(bol==0){
        if(mboost[1]<6){
            mboost[1]+=1;
            bmessage = pokes[pokeatual]+" endureceu";
        }else{
            bmessage = pokes[pokeatual]+" endureceu o limite";
        }
    }else if(bol==1){
        if(iboost[1]<6){
            iboost[1]+=1;
            bmessage = pokes[inimigoatual]+" endureceu";
        }else{
            bmessage = pokes[inimigoatual]+" endureceu o limite";
        }
    }
}

function AcidArmor(bol, aaccuracy, baccuracy){
    if(bol==0){
        if(mboost[1]<6){
            mboost[1]+=2;
            bmessage = pokes[pokeatual]+" endureceu bastante";
        }else{
            bmessage = pokes[pokeatual]+" endureceu o limite";
        }
    }else if(bol==1){
        if(iboost[1]<6){
            iboost[1]+=2;
            bmessage = pokes[inimigoatual]+" endureceu bastante";
        }else{
            bmessage = pokes[inimigoatual]+" endureceu o limite";
        }
    }
}

function Rest(bol, aaccuracy, baccuracy){
    if(bol==0){
        if(mestado == 0){
            vida = maxvida;
            mestado = 5;
            bmessage = pokes[pokeatual]+" recuperou a vida";
        }else{
            bmessage = pokes[pokeatual]+" já tem algum efeito";
        }
    }else if(bol==1){
        if(iestado == 0){
            inivida = maxinivida;
            iestado = 5;
            bmessage = pokes[inimigoatual]+" recuperou a vida";
        }else{
            bmessage = pokes[inimigoatual]+" já tem algum efeito";
        }
    }
}

function Recover(bol, aaccuracy, baccuracy){
    if(bol==0){
        vida = maxvida/2;
        bmessage = pokes[pokeatual]+" recuperou a vida";
    }else if(bol==1){
        inivida = maxinivida/2;
        bmessage = pokes[inimigoatual]+" recuperou a vida";
    }
}

function DefenseCurl(bol, aaccuracy, baccuracy){
    if(bol==0){
        if(mboost[1]<6){
            mboost[1]+=1;
            bmessage = pokes[pokeatual]+" endureceu";
        }else{
            bmessage = pokes[pokeatual]+" endureceu o limite";
        }
    }else if(bol==1){
        if(iboost[1]<6){
            iboost[1]+=1;
            bmessage = pokes[inimigoatual]+" endureceu";
        }else{
            bmessage = pokes[inimigoatual]+" endureceu o limite";
        }
    }
}

function Leer(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(iboost[1]>-6){
                iboost[1]-=1;
                bmessage = pokes[inimigoatual]+" perdeu defesa";
            }else{
                bmessage = pokes[inimigoatual]+" perdeu toda defesa";
            }
        }else if(bol==1){
            if(mboost[1]>-6){
                mboost[1]-=1;
                bmessage = pokes[pokeatual]+"  perdeu defesa";
            }else{
                bmessage = pokes[pokeatual]+" perdeu toda defesa";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Growl(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(iboost[0]>-6){
                iboost[0]-=1;
                bmessage = pokes[inimigoatual]+" perdeu ataque";
            }else{
                bmessage = pokes[inimigoatual]+" perdeu todo ataque";
            }
        }else if(bol==1){
            if(mboost[0]>-6){
                mboost[0]-=1;
                bmessage = pokes[pokeatual]+"  perdeu ataque";
            }else{
                bmessage = pokes[pokeatual]+" perdeu todo ataque";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function TailWhip(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(iboost[1]>-6){
                iboost[1]-=1;
                bmessage = pokes[inimigoatual]+" perdeu defesa";
            }else{
                bmessage = pokes[inimigoatual]+" perdeu toda defesa";
            }
        }else if(bol==1){
            if(mboost[1]>-6){
                mboost[1]-=1;
                bmessage = pokes[pokeatual]+"  perdeu defesa";
            }else{
                bmessage = pokes[pokeatual]+" perdeu toda defesa";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SandAttack(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(iaccuracy>50){
                iaccuracy-=10;
                bmessage = pokes[inimigoatual]+" perdeu precisão";
            }else{
                bmessage = pokes[inimigoatual]+" perdeu toda precisão";
            }
        }else if(bol==1){
            if(maccuracy>50){
                maccuracy-=10;
                bmessage = pokes[pokeatual]+" perdeu precisão";
            }else{
                bmessage = pokes[pokeatual]+" perdeu toda precisão";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SmokeScreen(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(iaccuracy>50){
                iaccuracy-=10;
                bmessage = pokes[inimigoatual]+" perdeu precisão";
            }else{
                bmessage = pokes[inimigoatual]+" perdeu toda precisão";
            }
        }else if(bol==1){
            if(maccuracy>50){
                maccuracy-=10;
                bmessage = pokes[pokeatual]+" perdeu precisão";
            }else{
                bmessage = pokes[pokeatual]+" perdeu toda precisão";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Minimize(bol, aaccuracy, baccuracy){
    if(bol==0){
        if(maccuracy<160){
            maccuracy+=20;
            bmessage = pokes[pokeatual]+" aumentou evasão";
        }else{
            bmessage = pokes[pokeatual]+" aumentou toda evasão";
        }
    }else if(bol==1){
        if(iaccuracy<160){
            iaccuracy+=20;
            bmessage = pokes[inimigoatual]+" aumentou evasão";
        }else{
            bmessage = pokes[inimigoatual]+" aumentou toda evasão";
        }
    }
}

function ConfuseRay(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            mconfuso = true;
            bmessage = pokes[inimigoatual]+" está confuso";
        }else if(bol==1){
            iconfuso = false;
            bmessage = pokes[pokeatual]+"  está confuso";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SuperSonic(bol, aaccuracy, baccuracy){
    var accuracy = 0.55;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            mconfuso = true;
            bmessage = pokes[inimigoatual]+" está confuso";
        }else if(bol==1){
            iconfuso = false;
            bmessage = pokes[pokeatual]+"  está confuso";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

//special
function RazorLeaf(bol, aaccuracy, baccuracy){
    var accuracy = 0.95;
    var power = 55;
    var type = 4;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Absorb(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 20;
    var type = 4;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            vida+=damg/2;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            inivida+=damg/2;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function MegaDrain(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 4;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            vida+=damg/2;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            inivida+=damg/2;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SonicBoom(bol, aaccuracy, baccuracy){
    var accuracy = 0.9;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var damg = 20;
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var damg = 20;
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function DragoRage(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 ){
            if(tipos[inimigoatual][0] != 17 && tipos[inimigoatual][1] != 17){
                var damg = 40;
                inivida-=damg;
                bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
            }else{
                bmessage = pokes[inimigoatual]+" é imune!";
            }
        }else if(bol==1){
            if(tipos[inimigoatual][0] != 17 && tipos[inimigoatual][1] != 17){
                var damg = 40;
                vida-=damg;
                bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
            }else{
                bmessage = pokes[pokeatual]+" é imune!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Gust(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 9;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function WingAttack(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 60;
    var type = 9;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Ember(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9 && iestado==0){
                iestado = 1;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9 && mestado==0){
                mestado = 1;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function ThunderShock(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 3;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9 && iestado==0){
                iestado = 3;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9 && mestado==0){
                mestado = 3;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Thunder(bol, aaccuracy, baccuracy){
    var accuracy = 0.7;
    var power = 110;
    var type = 3;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7 && iestado==0){
                iestado = 3;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7 && mestado==0){
                mestado = 3;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Bubble(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 2;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function WaterGun(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 2;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Surf(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 90;
    var type = 2;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Flamethrower(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 90;
    var type = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9 && iestado==0){
                iestado = 1;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9 && mestado==0){
                mestado = 1;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Sludge(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 65;
    var type = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.7 && iestado==0){
                iestado = 4;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7 && mestado==0){
                mestado = 4;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function TriAttack(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 80;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.8 && iestado==0){
                iestado = Math.ceil(Math.random()*3);
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.8 && mestado==0){
                mestado = Math.ceil(Math.random()*3);
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Psybeam(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 65;
    var type = 10;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                iconfuso = true;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mconfuso = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Psychic(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 90;
    var type = 10;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9 && iboost[3]<6){
                iboost[3]--;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9 && mboost[3]<6){
                iboost[3]--;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function DreamEater(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 100;
    var type = 10;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0 && iestado == 5){
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            vida+=damg/2;
            if(vida>maxvida){
                vida = maxvida;
            }
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1 && mestado == 5){
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            inivida+=damg/2;
            if(inivida>maxinivida){
                inivida = maxinivida;
            }
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else{
            bmessage = "O pokémon está acordado!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Confusion(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 50;
    var type = 10;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                iconfuso = true;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mconfuso = true;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function NightShade(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(tipos[inimigoatual][0] != 0 && tipos[inimigoatual][1] != 0){
                var damg = meunvl;
                inivida-=damg;
                bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
            }else{
                bmessage = pokes[inimigoatual]+" é imune!";
            }
        }else if(bol==1){
            if(tipos[pokeatual][0] != 0 && tipos[pokeatual][1] != 0){
                var damg = ininvl;
                vida-=damg;
                bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
            }else{
                bmessage = pokes[pokeatual]+" é imune!";
            }
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function Acid(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 7;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                iboost[3]--;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mboost[3]--;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function AuroraBeam(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 65;
    var type = 5;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                iboost[0]--;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                mboost[0]--;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function IceBeam(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 90;
    var type = 5;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9 && iestado==0){
                iestado = 2;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9 && mestado==0){
                mestado = 2;
            }
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function SolarBeam(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 120;
    var type = 4;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            mrecharge = true;
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            irecharge = true;
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function FireBlast(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 120;
    var type = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            mrecharge = true;
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            irecharge = true;
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function HydroPump(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 120;
    var type = 2;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            mrecharge = true;
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            irecharge = true;
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
}

function HyperBeam(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 120;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            mrecharge = true;
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            irecharge = true;
            var atk = ((50+2*Statusg[inimigoatual][3]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][4]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, pokeatual, 1, bol);
            vida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }
    }else{
        if(bol==0){
            bmessage = pokes[pokeatual]+" errou o ataque!";
        }else if(bol==1){
            bmessage = pokes[inimigoatual]+" errou o ataque!";
        }
    }
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
var spotionpng = new Image();
var arena = new Image();
var arena2 = new Image();
var arena3 = new Image();
var mart = new Image();
var arenaescolher = 0;
var count = 1;
var choose = 1;
var message = "Use as setas <- e -> para decidir o pokémon e 'enter' para selecionar!";
var poke = "";
var escolha = false;
var yn = 0;
var fob = 1; //fob = fight or bag
var money = 10;
var comp = 1;
var bag=[,];
bag[1]= 0
bag[2]=0
var bagoverlay = false;
var bagovs = 1;


//transição
var tela = 1;
var versus = new Image();
var spr1 = new Image();
var spr2 = new Image();

//batalha
var pokeatual, meunvl, vida, maxvida, inimigoatual, ininvl, inivida, maxinivida, Statusg=[], pokes=[], moves=[], tipos=[], lvs=[], mboost=[], iboost=[];
var yatk = 0;
var xatk = 0;
var bmessage;
var battlemode = 0;
var click;
var inimigoatk = 0;
var meuatk = 0;
var mseed = false;
var iniseed = false;
var mestado = 0;
var iestado = 0;
var meuestado = new Image();
var iniestado = new Image();
var backcount = new Image();
var mrecharge = false;
var irecharge = false;
var mconfuso = false;
var iconfuso = false;
var mwrap = false;
var iwrap = false;
var flinch = false;
var mflinch = false;
var iwait = false;
var mwait = false;
var mspeed = 0;
var ispeed = 0;
var item = -1;
var damagepng = new Image();
var xplayer = 300;
var xini = 500;
var anim = false;
//errar e acertar
var maccuracy = 1, mevasion = 1, iaccuracy = 1, ievasion = 1, a = 1;
pokes = [0,"Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];
//moves
moves = [0,[Tackle, LeechSeed, PoisonPowder, RazorLeaf],[SleepPowder, LeechSeed, PoisonPowder, RazorLeaf],[SleepPowder, LeechSeed, PoisonPowder, SolarBeam],[Scratch, Ember, 0, 0],[Slash, Ember, 0, 0],[FireBlast, Flamethrower, BodySlam, Earthquake],[Tackle, Bubble, Bite, 0],[Tackle, WaterGun, Bite, MegaPunch],[HydroPump, WaterGun, Bite, MegaPunch],[Tackle, 0, 0, 0],[Tackle, Harden, 0, 0],[Confusion, PoisonPowder, Psybeam, SleepPowder],[PoisonSting, 0, 0, 0],[PoisonSting, Harden, 0, 0],[PoisonSting, Harden, Toxic, FuryAttack],[Gust, QuickAttack, SandAttack, 0],[Gust, QuickAttack, SandAttack, WingAttack],[HyperBeam, QuickAttack, SandAttack, WingAttack],[Tackle, QuickAttack, 0, 0],[SuperFang, QuickAttack, HyperFang, 0],[Peck, 0, 0, 0],[Peck, FuryAttack, DrillPeck, 0],[Leer, Wrap, PoisonSting, 0],[Leer, Wrap, PoisonSting, Acid],[ThunderShock, ThunderWave, Growl, QuickAttack],[Thunder, ThunderWave, MegaPunch, QuickAttack],[Scratch, SandAttack, PoisonSting, 0],[Swift, FurySwipes, PoisonSting, Dig],[Tackle, PoisonSting, Bite, 0],[Tackle, PoisonSting, Bite, FurySwipes],[Earthquake, Toxic, BodySlam, FurySwipes],[Tackle, PoisonSting, Bite, 0],[Tackle, PoisonSting, Bite, FurySwipes],[Earthquake, Toxic, BodySlam, FurySwipes],[Growl, Sing, DefenseCurl, Metronome],[Growl, Sing, DoubleSlap, Metronome],[Ember, QuickAttack, ConfuseRay, 0],[Swift, QuickAttack, ConfuseRay, Flamethrower],[Sing, Pound, DefenseCurl, DoubleSlap],[Sing, BodySlam, DefenseCurl, DoubleSlap],[Bite, LeechLife, SuperSonic, 0],[Bite, LeechLife, SuperSonic, WingAttack],[Absorb, PoisonPowder, Acid, SleepPowder],[Absorb, PoisonPowder, Acid, SleepPowder],[MegaDrain, PoisonPowder, SolarBeam, SleepPowder],[Scratch, StunSpore, LeechLife, 0],[Scratch, StunSpore, LeechLife, Slash],[Tackle, PoisonPowder, LeechLife, 0],[Psybeam, PoisonPowder, LeechLife, Psychic],[Scratch, Dig, SandAttack, 0],[Slash, Dig, SandAttack, Earthquake],[Growl, Scratch, Bite, PayDay],[FurySwipes, Slash, Bite, PayDay],
[Scratch, TailWhip, Confusion, 0],[FurySwipes, TailWhip, Confusion, HydroPump],[Scratch, FurySwipes, KarateChop, 0],[SeismicToss, FurySwipes, KarateChop, Thrash],[Bite, Ember, Leer, 0],[Bite, Flamethrower, TakeDown, FireBlast],[Bubble, Hypnosis, WaterGun, DoubleSlap],[BodySlam, Hypnosis, WaterGun, DoubleSlap],[BodySlam, Hypnosis, HydroPump, DoubleSlap],[Teleport, 0, 0, 0],[Teleport, Confusion, Psybeam, 0],[Metronome, Confusion, Psybeam, Psychic],[KarateChop, Leer, MegaKick, 0],[KarateChop, Leer, MegaKick, SeismicToss],[KarateChop, Submission, MegaKick, SeismicToss],[VineWhip, Wrap, PoisonPowder, 0],[VineWhip, Wrap, PoisonPowder, RazorLeaf],[Slam, Wrap, PoisonPowder, RazorLeaf],[WaterGun, Wrap, PoisonSting, SuperSonic],[WaterGun, Wrap, PoisonSting, HydroPump],[Tackle, DefenseCurl, RockThrow, 0],[Tackle, DefenseCurl, RockThrow, SelfDestruct],[Explosion, DefenseCurl, RockThrow, Earthquake],[Ember, TailWhip, Stomp, 0],[TakeDown, TailWhip, Stomp, FireBlast],[Confusion, Headbutt, Growl, 0],[Confusion, Headbutt, Psychic, WaterGun],[SuperSonic, ThunderShock, SonicBoom, 0],[SuperSonic, Thunder, SonicBoom, ThunderWave],[Peck, SandAttack, FurySwipes, Slash],[Peck, Growl, FurySwipes, DrillPeck],
[Peck, TriAttack, FurySwipes, DrillPeck],[Headbutt, Growl, AuroraBeam, Rest],[TakeDown, IceBeam, AuroraBeam, Rest],[PoisonGas, Pound, Minimize, 0],[PoisonGas, AcidArmor, Minimize, Harden],[Tackle, Withdraw, SuperSonic, 0],[TriAttack, Withdraw, SuperSonic, IceBeam],[ConfuseRay, Lick, NightShade, 0],[ConfuseRay, Lick, NightShade, Hypnosis],[DreamEater, Lick, NightShade, Hypnosis],[Tackle, Bind, RockThrow, Slam],[Hypnosis, Pound, Confusion, Headbutt],[Hypnosis, PoisonGas, Psychic, DreamEater],[Bubble, Leer, ViceGrip, 0],[Bubble, Harden, ViceGrip, Stomp],[Tackle, SonicBoom, SelfDestruct, 0],[Swift, SonicBoom, Explosion, ThunderShock],[Hypnosis, LeechSeed, StunSpore, 0],[SleepPowder, Stomp, StunSpore, SolarBeam],[BoneClub, Growl, Leer, Thrash],[Bonemerang, Growl, Leer, Thrash],[DoubleKick, MegaKick, HiJumpKick, RollingKick],[MegaPunch, FirePunch, ThunderPunch, IcePunch],[Slam, SuperSonic, Wrap, Stomp],[Tackle, SmokeScreen, SelfDestruct, Sludge],[Tackle, SmokeScreen, Explosion, Sludge],[HornAttack, Stomp, FuryAttack, TakeDown],[HornAttack, Surf, Earthquake, TakeDown],[DoubleSlap, DoubleEdge, Sing, Minimize],[Bind, Absorb, PoisonPowder, Slam],[Bite, MegaPunch, DizzyPunch, CometPunch],[Bubble, SmokeScreen, WaterGun, Leer],[Bubble, SmokeScreen, WaterGun, HydroPump],[Peck, SuperSonic, HornAttack, FuryAttack],[TakeDown, Surf, HornAttack, FuryAttack],[Tackle, WaterGun, Harden, Recover],[HydroPump, Surf, Harden, Recover],[Confusion, DoubleSlap, 0],[QuickAttack, Leer, Slash, Swift],[DoubleSlap, IcePunch, BodySlam, Thrash],[QuickAttack, ThunderShock, ThunderPunch, Thunder],[Ember, ConfuseRay, FirePunch, Flamethrower],[ViceGrip, SeismicToss, Harden, Slash],[Tackle, Stomp, Leer, TakeDown],[Splash, 0, 0, 0],[DragoRage, HydroPump, HyperBeam, Bite],[Sing, IceBeam, BodySlam, Surf],
[Transform, 0, 0, 0],[SandAttack, Tackle, QuickAttack, Bite],[SandAttack, Surf, HydroPump, Bite],[SandAttack, ThunderShock, Thunder, Bite],[SandAttack, Flamethrower, FireBlast, Bite],[Recover, Psybeam, TriAttack, Tackle],[WaterGun, Withdraw, HornAttack, Leer],[WaterGun, Withdraw, HornAttack, HydroPump],[Harden, Scratch, Absorb, Slash],[Harden, HydroPump, Absorb, Slash],[WingAttack, SuperSonic, Bite, HyperBeam],[Rest, BodySlam, HyperBeam, Headbutt],[IceBeam, Peck, HyperBeam, Rest],[ThunderShock, Peck, Thunder, Rest],[Flamethrower, Peck, FireBlast, Rest],[Wrap, ThunderWave, Slam, 0],[Wrap, ThunderWave, Slam, DragoRage],[FireBlast, HyperBeam, Surf, DragoRage],[Psychic, Thunder, Recover, IceBeam],[Psychic, Transform, Recover, Metronome]];
//status
Statusg = [0,[45,49,49,65,65,45],[60,62,63,80,80,60],[80,82,83,100,100,80],[39,52,43,60,50,65],[58,64,58,80,65,80],[78,84,78,109,85,100],[44,48,65,50,64,43],[59,63,80,65,80,58],[79,83,100,85,105,78],[45,30,35,20,20,45],[50,20,55,25,25,30],[60,45,50,90,80,70],[40,35,30,20,20,50],[45,25,50,25,25,35],[65,90,40,45,80,75],[40,45,40,35,35,56],[63,60,55,50,50,71],[83,80,75,70,70,101],[30,56,35,25,35,72],[55,81,60,50,70,97],[40,60,30,31,31,70],[65,90,65,61,61,100],[35,60,44,40,54,55],[60,95,69,65,79,80],[35,55,40,50,50,90],[60,90,55,90,80,110],[50,75,85,20,30,40],[75,100,110,45,55,65],[55,47,52,40,40,41],[70,62,67,55,55,56],[90,92,87,75,85,76],[46,57,40,40,40,50],[61,72,57,55,55,65],[81,102,77,85,75,85],[70,45,48,60,65,35],[95,70,73,95,90,60],[38,41,40,50,65,65],[73,76,75,81,100,100],[115,45,20,45,25,20],[140,70,45,85,50,45],[40,45,35,30,40,55],[75,80,70,65,70,90],[45,50,55,75,65,30],[60,65,70,85,75,40],[75,80,85,110,90,50],[35,70,55,45,55,25],[60,95,80,60,80,30],[60,55,50,40,55,45],[70,65,60,90,75,90],[10,55,25,35,45,95],[35,100,50,50,70,120],[40,45,35,40,40,90],[65,70,60,65,65,115],[50,52,48,65,50,55],[80,82,78,95,80,85],[40,80,35,35,45,70],[65,105,60,60,70,95],[55,70,45,70,50,60],[90,110,80,100,80,95],[40,50,40,40,40,90],[65,65,65,50,50,90],[90,95,95,70,90,70],[25,20,15,105,55,90],[40,35,30,120,70,105],[55,50,45,135,95,120],[70,80,50,35,35,35],[80,100,70,50,60,45],[90,130,80,65,85,55],[50,75,35,70,30,40],[65,90,50,85,45,55],[80,105,65,100,70,70],[40,40,35,50,100,70],[80,70,65,80,120,100],[40,80,100,30,30,20],
[55,95,115,45,45,35],[80,120,130,55,65,45],[50,85,55,65,65,90],[65,100,70,80,80,105],[90,65,65,40,40,15],[95,75,110,100,80,30],[25,35,70,95,55,45],[50,60,95,120,70,70],[52,90,55,58,62,60],[35,85,45,35,35,75],[60,110,70,60,60,110],[65,45,55,45,70,45],[90,70,80,70,95,70],[80,80,50,40,50,25],[105,105,75,65,100,50],[30,65,100,45,25,40],[50,95,180,85,45,70],[30,35,30,100,35,80],[45,50,45,115,55,95],[60,65,60,130,75,110],[35,45,160,30,45,70],[60,48,45,43,90,42],[85,73,70,73,115,67],[30,105,90,25,25,50],[55,130,115,50,50,75],[40,30,50,55,55,100],[60,50,70,80,80,150],[60,40,80,60,45,40],[95,95,85,125,75,55],[50,50,95,40,50,35],[60,80,110,50,80,45],[50,120,53,35,110,87],[50,105,79,35,110,76],[90,55,75,60,75,30],[40,65,95,60,45,35],[65,90,120,85,70,60],[80,85,95,30,30,20],[105,130,120,45,45,40],[250,5,5,35,105,50],[65,55,115,100,40,60],[105,95,80,40,80,90],[30,40,70,70,25,60],[55,65,95,95,45,85],[45,67,60,35,50,63],[80,92,65,65,80,68],[30,45,55,70,55,85],[60,75,85,100,85,115],[40,45,65,100,120,90],[70,110,80,55,80,105],[65,50,35,115,95,95],[65,83,57,95,85,105],[65,95,57,100,85,93],[65,125,100,55,70,85],[75,100,95,40,70,110],[20,10,55,15,20,80],[95,125,79,60,100,81],[130,85,80,85,95,60],[48,48,48,48,48,48],[55,55,50,45,65,55],[130,65,60,110,95,65],[65,65,60,110,95,130],[65,130,60,95,110,65],[65,60,70,85,75,40],[35,40,100,90,55,35],[70,60,125,115,70,55],[30,80,90,55,45,55],[60,115,105,65,70,80],[80,105,65,60,75,130],[160,110,65,65,110,30],[90,85,100,95,125,85],[90,90,85,125,90,100],[90,100,90,125,85,90],[41,64,45,50,50,50],[61,84,65,70,70,70],[91,134,95,100,100,80],[106,110,90,154,90,130],[100,100,100,100,100,100]]
//Types
tipos=[0,[4,7],[4,7],[4,7],[1],[1],[1,9],[2],[2],[2],[11],[11],[11,9],[11,7],[11,7],[11,7],[0,9],[0,9],[0,9],[0],[0],[0,9],[0,9],[7],[7],[3],[3],[8],[8],[7],[7],[7,8],[7],[7],[7,8],[17],[17],[1],[1],[0,17],[0,17],[7,9],[7,9],[4,7],[4,7],[4,7],[11,4],[11,4],[11,7],[11,7],[8],[8],[0],[0],[2],[2],[6],[6],[1],[1],[2],[2],[2,6],[10],[10],[10],[6],[6],[6],[4,7],[4,7],[4,7],[2,7],[2,7],[12,6],[12,6],[12,6],[1],[1],[2,10],[2,10],[3,16],[3,16],[0,9],[0,9],[0,9],[2],[2,5],[7],[7],[2],[2,5],[13,7],[13,7],[13,7],[12,8],[10],[10],[2],[2],[3],[3],[4,10],[4,10],[8],[8],[6],[6],[0],[7],[7],[8,12],[8,12],[0],[4],[0],[2],[2],[2],[2],[2],[2,10],[10,17],[9,11],[5,10],[3],[1],[11],[0],[2],[2,9],[2,5],[0],[0],[2],[3],[1],[0],[12,2],[12,2],[12,2],[12,2],[12,9],[0],[5,9],[3,9],[1,9],[14],[14],[14,9],[10],[10]];
//niveis de evolução
lvs=[0,16,32,-1,16,36,-1,16,36,-1,7,10,-1,7,10,-1,18,36,-1,20,-1,20,-1,22,-1,-2,-1,22,-1,16,-3,-1,16,-3,-1,-3,-1,-4,-1,-3,-1,22,-1,21,-5,-1,24,-1,31,-1,26,-1,28,-1,33,-1,28,-1,-4,-1,25,-6,-1,16,40,-1,28,40,-1,21,-5,-1,30,-1,25,40,-1,40,-1,37,-1,30,-1,-1,31,-1,34,-1,38,-1,-6,-1,25,40,-1,-1,26,-1,38,-1,30,-1,-5,-1,28,-1,-1,-1,-1,-1,35,-1,42,-1,-1,-1,-1,32,-1,33,-1,-6,-1,-1,-1,-1,-1,-1,-1,20,-1,-1,-1,-1,-1,-1,-1,-1,40,-1,40,-1,-1,-1,-1,-1,-1,30,55,-1,-1,-1,];
//status boost
mboost=[0,0,0,0,0];
iboost=[0,0,0,0,0];
meunvl = 5;
do{
    ininvl = Math.ceil(Math.random()*meunvl+3);
}while(ininvl<meunvl-2);
meuxp = 0;
maxxp = 100;

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
    if(event.keyCode === 8)
    {
        backspace();
    }
});

//se apertar pra esquerda, executar
function left(){
    if(tela == 4){
        comp = comp-1;
        if(comp < 1){
            comp = 2;}}else{
    if(tela==1){
        if(!escolha){
            count-=2;
            choose--;
            if(count<1){
                choose=4;
                count = 7;
            }
        }else{
            yn--;
            if(yn<0){
                yn=1;
            }
        }
    }else if(tela==3){
        if(battlemode==0 && bagoverlay == false){
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
    }}}

//funçoes de items
function potion(){
    bmessage = pokes[pokeatual]+" usou Potion";
    item = 0;
}
function spotion(){
    bmessage = pokes[pokeatual]+" usou SuperPotion";
    item = 1;
}
function Cura(cura){
    vida = vida+cura;
    if(vida > maxvida){
        vida = maxvida
    }
    bmessage = pokes[pokeatual]+" curou "+(cura-(vida+cura-maxvida))+" pontos de vida!";
}
//se apertar pra direita, executar
function right(){
    if(tela == 4){
        comp = comp+1;
        if(comp > 2){
            comp = 1;
    }}
    if(tela==1){
        if(!escolha){
            count+=2;
            choose++;
            if(count>7){
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
        if(battlemode==0 && bagoverlay == false){
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
    }}


//se apertar pra cima, executar
function up(){
    if(bagoverlay == true)
    {
        bagovs = bagovs+1;
        if(bagovs > 2){
            bagovs = 1;
        }}
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
    if(bagoverlay == true)
    {
        bagovs = bagovs-1;
        if(bagovs < 1){
            bagovs = 2;
        }}
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
    if(tela == 4){
        if(comp == 1 && money >= 10){
            bag[1]+=1;
            money = money-10;
        }
        if(comp == 2 && money >= 50){
            bag[2]+=1;
            money = money-50;
        }
    }
    if(tela==1){
        if(!escolha){
            switch(choose){
                case 1:
                    poke = "Bulbassaur?";
                    break;
                case 2:
                    poke = "Charmander?";
                    break;
                case 3:
                    poke = "Squirtle?";
                    break;
                case 4:
                    poke = "um Aleatório?"
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
                }else if(choose == 4){
                    pokeatual = Math.ceil(Math.random()*151);;
                }
                inimigoatual = Math.ceil(Math.random()*151);//151 para todos
                arenaescolher = Math.ceil(Math.random()*3);
                escolha = false;
            }
        }
    }else if(tela==2){
        tela = 3;
        maxvida = ((50+2*Statusg[pokeatual][0])*meunvl/100)+10+meunvl;
        maxinivida = ((50+2*Statusg[inimigoatual][0])*ininvl/100)+10+ininvl;;
        vida = maxvida;
        inivida = maxinivida;
        mseed = false;
        iniseed = false;
        mestado = 0;
        iestado = 0;
        mconfuso = false;
        iconfuso = false; 
        mboost=[0,0,0,0,0];
        iboost=[0,0,0,0,0];
        mwrap = false;
        iwrap = false;
        iwait = false;
        mwait = false;
    }else if(tela==3){
        if(battlemode==0){
            if(bagoverlay == true){
                if(bagovs == 1 && bag[1] > 0){
                    potion();
                    bag[1]-=1;
                    mspeed += 10000;
                    if(!iwait){
                        do{
                            inimigoatk = Math.floor(Math.random()*4);
                        }while(moves[inimigoatual][inimigoatk]==0);
                    }
                    battlemode = 2;
                }
                if(bagovs == 2 && bag[2] > 0){
                    spotion();
                    bag[2]-=1;
                    mspeed += 10000;
                    if(!iwait){
                        do{
                            inimigoatk = Math.floor(Math.random()*4);
                        }while(moves[inimigoatual][inimigoatk]==0);
                    }
                    battlemode = 2;
                }
            }
            if(fob == 2 && bagoverlay==false){
                bagoverlay = true
            }
            if(fob==1){
                battlemode=1;
            }
        }else if(battlemode==1){
            mspeed = ((50+2*Statusg[pokeatual][5]+5)*meunvl/100);
            ispeed = ((50+2*Statusg[inimigoatual][5]+5)*ininvl/100);
            if(mestado == 3){
                mspeed-=500;
            }
            if(iestado == 3){
                ispeed-=500;
            }
            if(xatk==0 && yatk==0 && moves[pokeatual][0] != 0){
                meuatk = 0;
                battlemode=2;
            }else if(xatk==1 && yatk==0 && moves[pokeatual][1] != 0){
                meuatk = 1;
                battlemode=2;
            }else if(xatk==0 && yatk==1 && moves[pokeatual][2] != 0){
                meuatk = 2;
                battlemode=2;
            }else if(xatk==1 && yatk==1 && moves[pokeatual][3] != 0){
                meuatk = 3;
                battlemode=2;
            }
            if(!iwait){
                do{
                    inimigoatk = Math.floor(Math.random()*4);
                }while(moves[inimigoatual][inimigoatk]==0);
            }
            if(moves[pokeatual][meuatk].name=="QuickAttack"){
                mspeed+=1000;
            }
            if(moves[inimigoatual][inimigoatk].name=="QuickAttack"){
                ispeed+=1000;
            }
            if(mspeed>ispeed){
                bmessage = pokes[pokeatual]+" usou "+moves[pokeatual][meuatk].name;
            }else{
                bmessage = pokes[inimigoatual]+" usou "+moves[inimigoatual][inimigoatk].name;
            }
        }else if(battlemode==2){
            bagoverlay = false;
            click++;
            if(mspeed>ispeed){
                if(click == 1){
                    if(item==-1){
                        if(mestado == 5){
                            if(Math.random()>0.6){
                                mestado = 0;
                            }
                        }
                        if(mestado == 2){
                            if(Math.random()>0.6){
                                mestado = 0;
                            }
                        }
                        if(mestado != 5 && mestado != 2){
                            if(mestado == 3){
                                a = Math.random();
                            }
                            if(a > .5){
                                if(!mconfuso || mconfuso && Math.random()>0.66){
                                    if(xatk==0 && yatk==0){
                                        moves[pokeatual][0](0,maccuracy,iaccuracy);
                                    }else if(xatk==1 && yatk==0){
                                        moves[pokeatual][1](0,maccuracy,iaccuracy);
                                    }else if(xatk==0 && yatk==1){
                                        moves[pokeatual][2](0,maccuracy,iaccuracy);
                                    }else if(xatk==1 && yatk==1){
                                        moves[pokeatual][3](0,maccuracy,iaccuracy);
                                    }
                                    if(inivida<0){
                                        inivida=0;
                                    }
                                }else{
                                    bmessage = pokes[pokeatual]+" se bateu por estar confuso!";
                                    vida-=5;
                                }
                                a = 1;
                            }else{
                                bmessage = "Está paralizado!"
                                a = 1;
                            }
                        }else{
                            bmessage = pokes[pokeatual]+" está impossibilitado de fazer isso";
                        }
                    }else{
                        if(item == 0){
                            Cura(20);
                        }
                        if(item == 1){
                            Cura(50);
                        }
                        item = -1;
                    }
                }else if(click==2){
                    gameover();
                    if(inivida<=0){
                        tela = 2;
                        money += 10;
                        battlemode=0;
                        bmessage = "";
                        inimigoatual = Math.ceil(Math.random()*151);//151 para todos
                        arenaescolher = Math.ceil(Math.random()*3);
                        meuxp+=10*ininvl;
                        do{
                            ininvl = Math.ceil(Math.random()*meunvl+2);
                        }while(ininvl<meunvl-3);
                        while(meuxp>=maxxp){
                            meuxp=meuxp-maxxp;
                            maxxp=maxxp*2;
                            meunvl++;
                        }
                        click=0;
                        if(lvs[pokeatual]!=-1 && lvs[pokeatual]<=meunvl){
                            pokeatual++;
                        }
                    }else{
                        if(!flinch){
                            bmessage = pokes[inimigoatual]+" usou "+moves[inimigoatual][inimigoatk].name;
                        }else{
                            flinch = false;
                            click = 3;
                        }
                    }
                }else if(click == 3){
                    if(iestado == 5){
                        if(Math.random()>0.6){
                            iestado = 0;
                        }
                    }
                    if(iestado == 2){
                        if(Math.random()>0.6){
                            iestado = 0;
                        }
                    }
                    if(iestado != 5 && iestado != 2){
                        if(irecharge == false){
                            if(iestado == 3){
                                a = Math.random();
                            }
                            if(a > .5){
                                if(!iconfuso || iconfuso && Math.random()>0.66){
                                    moves[inimigoatual][inimigoatk](1,iaccuracy,maccuracy);
                                    if(vida<0){
                                        vida=0;
                                    }
                                }else{
                                    bmessage = pokes[inimigoatual]+" se bateu por estar confuso!";
                                    inivida-=5;
                                }
                                    a = 1;
                            }else{
                                bmessage = "Está paralizado!"
                                a = 1;
                            }
                        }else{
                            bmessage = pokes[inimigoatual]+" está recarregando";
                            irecharge = false;
                        }
                    }else{
                        bmessage = pokes[inimigoatual]+" está impossibilitado de fazer isso";
                    }
                }else if(click == 4){
                    if(vida > 0){
                    if(mseed == true){
                        vida-=maxvida/8;
                        inivida+=maxvida/8;
                    }
                    if(iniseed == true){
                        inivida-=maxinivida/8;
                        vida+=maxinivida/8;
                    }
                    if(mwrap == true){
                        vida-=maxvida/8;
                    }
                    if(iwrap == true){
                        inivida-=maxinivida/8;
                    }
                    if(mestado == 4){
                        vida-=maxvida/8;
                    }
                    if(iestado == 4){
                        inivida-=maxvida/8;
                    }
                    if(mestado == 1){
                        vida-=maxvida/16;
                    }
                    if(iestado == 1){
                        inivida-=maxvida/16;
                    }
                    bmessage = "Dano extra";
                    if(vida>maxvida){
                        vida=maxvida
                    }
                    if(inivida>maxinivida){
                        inivida=maxinivida
                    }
                }
                if(inivida<=0){
                    tela = 2;
                    money += 5;
                    battlemode=0;
                    bmessage = "";
                    inimigoatual = Math.ceil(Math.random()*151);//151 para todos
                    arenaescolher = Math.ceil(Math.random()*3);
                    meuxp+=10*ininvl;
                    do{
                        ininvl = Math.ceil(Math.random()*meunvl+2);
                    }while(ininvl<meunvl-3);
                    if(meuxp>=maxxp){
                        meuxp=meuxp-maxxp;
                        maxxp=maxxp*2;
                        meunvl++;
                    }
                    click=0;
                    if(lvs[pokeatual]!=-1 && lvs[pokeatual]<=meunvl){
                        pokeatual++;
                    }
                }
                }else if(click == 5){
                    gameover();
                    if(mrecharge == false){
                        if(!mwait){
                        click=0;
                        battlemode = 0;
                        }else{
                            click=0;
                            battlemode = 2;
                            bmessage = pokes[pokeatual]+" usou Dig!";
                        }
                    }else{
                        mrecharge = false;
                        click=1;
                        battlemode = 2;
                        bmessage = "Está recarregando";
                    }
                }
            }else{
                if(click == 1){
                    if(iestado == 5){
                        if(Math.random()>0.6){
                            iestado = 0;
                        }
                    }
                    if(iestado == 2){
                        if(Math.random()>0.6){
                            iestado = 0;
                        }
                    }
                    if(iestado != 5 && iestado != 2){
                        if(irecharge == false){
                            if(iestado == 3){
                                a = Math.random();
                            }
                            if(a > .5){
                                if(!iconfuso || iconfuso && Math.random()>0.66){
                                    moves[inimigoatual][inimigoatk](1,iaccuracy,maccuracy);
                                    if(vida<0){
                                        vida=0;
                                    }
                                }else{
                                    bmessage = pokes[inimigoatual]+" se bateu por estar confuso!";
                                    inivida-=5;
                                }
                                    a = 1;
                            }else{
                                bmessage = "Está paralizado!"
                                a = 1;
                            }
                        }else{
                            bmessage = pokes[inimigoatual]+" está recarregando";
                            irecharge = false;
                        }
                    }else{
                        bmessage = pokes[inimigoatual]+" está impossibilitado de fazer isso";
                    }
                }else if(click==2){
                    gameover();
                    if(!mflinch){
                        bmessage = pokes[pokeatual]+" usou "+moves[pokeatual][meuatk].name;
                    }else{
                        click = 3;
                        mflinch = false;
                    }
                }else if(click == 3){
                    if(mestado == 5){
                        if(Math.random()>0.6){
                            mestado = 0;
                        }
                    }
                    if(mestado == 2){
                        if(Math.random()>0.6){
                            mestado = 0;
                        }
                    }
                    if(mestado != 5 && mestado != 2){
                        if(mestado == 3){
                            a = Math.random();
                        }
                        if(a > .5){
                            if(!mconfuso || mconfuso && Math.random()>0.66){
                                if(xatk==0 && yatk==0){
                                    moves[pokeatual][0](0,maccuracy,iaccuracy);
                                }else if(xatk==1 && yatk==0){
                                    moves[pokeatual][1](0,maccuracy,iaccuracy);
                                }else if(xatk==0 && yatk==1){
                                    moves[pokeatual][2](0,maccuracy,iaccuracy);
                                }else if(xatk==1 && yatk==1){
                                    moves[pokeatual][3](0,maccuracy,iaccuracy);
                                }
                                if(inivida<0){
                                    inivida=0;
                                }
                            }else{
                                bmessage = pokes[pokeatual]+" se bateu por estar confuso!";
                                vida-=5;
                            }
                            a = 1;
                        }else{
                            bmessage = "Está paralizado!"
                            a = 1;
                        }
                    }else{
                        bmessage = pokes[pokeatual]+" está impossibilitado de fazer isso";
                    }
                    if(inivida<=0){
                        tela = 2;
                        money += 10;
                        battlemode=0;
                        bmessage = "";
                        inimigoatual = Math.ceil(Math.random()*151);//151 para todos
                        arenaescolher = Math.ceil(Math.random()*3);
                        meuxp+=10*ininvl;
                        do{
                            ininvl = Math.ceil(Math.random()*meunvl+2);
                        }while(ininvl<meunvl-3);
                        while(meuxp>=maxxp){
                            meuxp=meuxp-maxxp;
                            maxxp=maxxp*2;
                            meunvl++;
                        }
                        click=0;
                        if(lvs[pokeatual]!=-1 && lvs[pokeatual]<=meunvl){
                            pokeatual++;
                        }
                    }
                }else if(click == 4){
                    if(vida > 0){
                    if(mseed == true){
                        vida-=maxvida/8;
                        inivida+=maxvida/8;
                    }
                    if(iniseed == true){
                        inivida-=maxinivida/8;
                        vida+=maxinivida/8;
                    }
                    if(mwrap == true){
                        vida-=maxvida/8;
                    }
                    if(iwrap == true){
                        inivida-=maxinivida/8;
                    }
                    if(mestado == 4){
                        vida-=maxvida/8;
                    }
                    if(iestado == 4){
                        inivida-=maxvida/8;
                    }
                    if(mestado == 1){
                        vida-=maxvida/16;
                    }
                    if(iestado == 1){
                        inivida-=maxvida/16;
                    }
                    bmessage = "Dano extra";
                    if(vida>maxvida){
                        vida=maxvida
                    }
                    if(inivida>maxinivida){
                        inivida=maxinivida
                    }
                }
                if(inivida<=0){
                    tela = 2;
                    money += 5;
                    battlemode=0;
                    bmessage = "";
                    inimigoatual = Math.ceil(Math.random()*151);//151 para todos
                    arenaescolher = Math.ceil(Math.random()*3);
                    meuxp+=10*ininvl;
                    do{
                        ininvl = Math.ceil(Math.random()*meunvl+2);
                    }while(ininvl<meunvl-3);
                    if(meuxp>=maxxp){
                        meuxp=meuxp-maxxp;
                        maxxp=maxxp*2;
                        meunvl++;
                    }
                    click=0;
                    if(lvs[pokeatual]!=-1 && lvs[pokeatual]<=meunvl){
                        pokeatual++;
                    }
                }
                }else if(click == 5){
                    if(inivida<=0){
                        tela = 2;
                        money += 5;
                        battlemode=0;
                        bmessage = "";
                        inimigoatual = Math.ceil(Math.random()*151);//151 para todos
                        arenaescolher = Math.ceil(Math.random()*3);
                        meuxp+=10*ininvl;
                        do{
                            ininvl = Math.ceil(Math.random()*meunvl+2);
                        }while(ininvl<meunvl-3);
                        while(meuxp>=maxxp){
                            meuxp=meuxp-maxxp;
                            maxxp=maxxp*2;
                            meunvl++;
                        }
                        click=0;
                        if(lvs[pokeatual]!=-1 && lvs[pokeatual]<=meunvl){
                            pokeatual++;
                        }
                    }
                    gameover();
                    if(mrecharge == false){
                        if(!mwait){
                        click=0;
                        battlemode = 0;
                        }else{
                            click=0;
                            battlemode = 2;
                            bmessage = pokes[pokeatual]+" usou Dig!";
                        }
                    }else{
                        mrecharge = false;
                        click=1;
                        battlemode = 2;
                        bmessage = "Está recarregando";
                    }
                }
            }
        }
    }
}

//se apertar backspace executar!
function backspace(){
if(tela == 2){tela = 4}else if(tela == 4){tela =2}
if(tela == 3){bagoverlay = false}
if(battlemode==1){
    battlemode=0;
}
}
//se o seu pokemon morrer executar
function gameover(){
 if(vida <= 0){
    money = 10;
    tela = 1;
    vida = maxvida
    ininvl = 5;
    meunvl = 5;
    message = "Use as setas <- e -> para decidir o pokémon e 'enter' para selecionar!";
    bmessage = "";
    fob = 1; //fob = fight or bag
    money = 10
    comp = 1
    bag[1]= 0
    bag[2]=0
    bagoverlay = false;
    bagovs = 1;
    battlemode =0;
    mboost=[0,0,0,0,0];
    iboost=[0,0,0,0,0];
    mconfuso = true;
    meuxp = 0;
    maxxp = 100;
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

        ctx.drawImage(chat, 345, 220, 110, 45);

        //desenhar mensagem
        ctx.font = "20px Arial";
        ctx.textAlign = "start";
        ctx.drawImage(chat, 2, 270, 720, 45);
        ctx.fillText(message, 50, 300);

        //sim ou não
        if(!escolha){
            if(choose<4){
                ctx.fillStyle = "rgb(184,241,112)";
                poke1.src = "Images/fundo/poke1.png";
                ctx.drawImage(poke1,50+(100*count), 100, 100, 100);
            }else{
                ctx.fillStyle = "rgb(184,241,112)";
                ctx.fillRect(345, 220, 110, 45);
            }
        }else{
            ctx.fillStyle = "rgb(184,241,112)";
            ctx.fillRect(45+(100*yn), 328, 50, 30);

            ctx.fillStyle = "black";
            ctx.fillText("Sim", 50, 350);
            ctx.fillText("Não", 150, 350);
        }
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Aleatório", 400, 250);

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

        //desenhar versus
        versus.src = "Images/fundo/versus.png"
        ctx.drawImage(versus,0,0,800,500);
        
        //Desenha os pokemons
        spr1.src = "Images/Sprites/"+pokeatual+".png";
        ctx.save();
        ctx.translate(350, 120);
        ctx.scale(-1, 1);
        ctx.drawImage(spr1, 0, 0, 350, 350);
        ctx.restore();
        spr2.src = "Images/Sprites/"+inimigoatual+".png";
        ctx.drawImage(spr2, 450, 120, 350, 350);

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
        arena.src = "Images/fundo/arena.png"
        arena2.src = "Images/fundo/arena2.png"
        arena3.src = "Images/fundo/arena3.png"

        if(arenaescolher == 1){
        ctx.drawImage(arena,0,0,800,350)}
        if(arenaescolher == 2){
            ctx.drawImage(arena2,0,0,800,350)}
            if(arenaescolher == 3){
                ctx.drawImage(arena3,0,0,800,350)}
        //desenhar pokémons
        spr1.src = "Images/Sprites/"+pokeatual+".png";
        ctx.save();
        ctx.translate(xplayer, 120);
        ctx.scale(-1, 1);
        if(!mwait)ctx.drawImage(spr1, 0, 50, 200, 200);
        ctx.restore();
        spr2.src = "Images/Sprites/"+inimigoatual+".png";
        if(!iwait)ctx.drawImage(spr2, xini, 160, 200, 200);

        //desenhar contagem
        backcount.src="Images/fundo/counter.png";
        ctx.drawImage(backcount, 380, -5, 150, 150);

        //desenhar barras de vida
        ctx.drawImage(chat, 10, 15, 240, 60);
        ctx.drawImage(chat, 550, 15, 240, 60);
        ctx.textAlign = "start";
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillRect(30, 20, 200, 15);
        ctx.fillRect(30, 55, 200, 10);
        ctx.fillText("Nvl: "+meunvl, 30, 50);
        ctx.fillStyle = "rgb(184,241,142)";
        ctx.fillRect(30, 20, 200*vida/maxvida, 15);
        ctx.fillStyle = "rgb(68,196,250)";
        ctx.fillRect(30, 55, 200*meuxp/maxxp, 10);
        ctx.fillStyle = "black";
        ctx.fillRect(770, 20, -200, 15);
        ctx.fillText("Nvl: "+ininvl, 730, 50);
        ctx.fillStyle = "rgb(184,241,142)";
        ctx.fillRect(770, 20, -200*inivida/maxinivida, 15);

        //Desenha Status:
        meuestado.src = "Images/icones/"+mestado+".png";
        ctx.drawImage(meuestado, 70, 35, 20, 20);
        iniestado.src = "Images/icones/"+iestado+".png";
        ctx.drawImage(iniestado, 710, 35, 20, 20);

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
        if(bagoverlay == true){
            ctx.drawImage(chat,580,300,250,150)
            if(bagovs == 1){
                ctx.fillStyle = "rgb(184,241,142)";
                ctx.fillRect(600, 310,100,40);
                
            }
            if(bagovs == 2){
                ctx.fillStyle = "rgb(184,241,142)";
                ctx.fillRect(600, 350,170,40);
                
            }ctx.fillStyle = "black";
            ctx.textAlign = "start";
            ctx.font = "25px Arial";
            ctx.fillText("Poção:"+bag[1], 600, 340);
            ctx.fillText("Super Poção:"+bag[2], 600, 380);
            
        }
        if(anim){
            if(mspeed>ispeed && click==1 || ispeed>mspeed && click==3){
                damagepng.src = "Images/fundo/damage.png";
                ctx.drawImage(damagepng,550,240,50,50);
                anim = false;
            }
            if(ispeed>mspeed && click==1 || mspeed>ispeed && click==3){
                damagepng.src = "Images/fundo/damage.png";
                ctx.drawImage(damagepng,200,240,50,50);
                anim = false;
            }
        }
    }
    if(tela == 4){
        mart.src = "Images/fundo/pokemart.png"
        ctx.clearRect(0,0,800,500)
        ctx.drawImage(mart,0,0,800,500)
        if(comp == 1){
            ctx.fillStyle = "rgb(184,241,142)";
            ctx.fillRect(15, 115,80,80);
            }
            if(comp == 2){
                ctx.fillStyle = "rgb(184,241,142)";
                ctx.fillRect(115, 115,80,80);
                }
        potionpng.src = "Images/fundo/potion.png";
        spotionpng.src = "Images/fundo/super-potion.png";
        ctx.drawImage(potionpng,0,100,100,100)
        ctx.drawImage(spotionpng,100,100,100,100)
        ctx.fillStyle = "black";
        ctx.textAlign = "start";
        ctx.font = "25px Arial";
        ctx.fillText("10$", 30, 220);
        ctx.fillText("50$", 130, 220);
        ctx.fillText("Dinheiro:"+money, 10, 25);
    }
    requestAnimationFrame(draw);
}

draw();