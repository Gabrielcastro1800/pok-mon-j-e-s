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

        if(bol == 0){
            for(var i=1;i<mboost[1+s*2];i++){
                boostdfs+=0.5;
            }
            for(var i=1;i<iboost[0+s*2];i++){
                boostatk+=0.5;
            }
            for(var i=1;i>mboost[1+s*2];i--){
                boostdfs=2/2-(i-1);
            }
            for(var i=1;i>iboost[0+s*2];i--){
                boostatk=2/2-(i-1);
            }
        }else if(bol == 1){
            for(var i=1;i<iboost[1+s*2];i++){
                boostdfs+=0.5;
            }
            for(var i=1;i<mboost[0+s*2];i++){
                boostatk+=0.5;
            }
            for(var i=1;i>iboost[1+s*2];i--){
                boostdfs=2/2-(i-1);
            }
            for(var i=1;i>mboost[0+s*2];i--){
                boostatk=2/2-(i-1);
            }
        }

    return ((((2*nvl/5+2)*atk*boostatk*atkpower/dfs*boostdfs)/50)+2)*multi;
}
//attacks
function Splash(bol, aaccuracy, baccuracy){
    bmessage = "Nada aconteceu!";
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
            var damg = damage(meunvl, atk, power, dfs, type, pokeatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, inimigoatual, 0, bol);
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

function Scratch(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 0;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            var atk = ((50+2*Statusg[pokeatual][1]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][2]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, pokeatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, inimigoatual, 0, bol);
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
            var damg = damage(meunvl, atk, power, dfs, type, pokeatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, inimigoatual, 0, bol);
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
            var damg = damage(meunvl, atk, power, dfs, type, pokeatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, inimigoatual, 0, bol);
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
            var damg = damage(meunvl, atk, power, dfs, type, pokeatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, inimigoatual, 0, bol);
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
            var damg = damage(meunvl, atk, power, dfs, type, pokeatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.7){
                mestado = 3;
            }
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, inimigoatual, 0, bol);
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
            var damg = damage(meunvl, atk, power, dfs, type, pokeatual, 0, bol);
            inivida-=damg;
            bmessage = pokes[pokeatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            var atk = ((50+2*Statusg[inimigoatual][1]+5)*ininvl/100);
            var dfs = ((50+2*Statusg[pokeatual][2]+5)*meunvl/100);
            var damg = damage(ininvl, atk, power, dfs, type, inimigoatual, 0, bol);
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

function Harden(bol, aaccuracy, baccuracy){
    if(bol==0){
        mboost[1]+=1;
        bmessage = pokes[pokeatual]+" endureceu";
    }else if(bol==1){
        iboost[1]+=1;
        bmessage = pokes[inimigoatual]+"  endureceu";
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

function Ember(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 40;
    var type = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                mestado = 1;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                iestado = 1;
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

function Flamethrower(bol, aaccuracy, baccuracy){
    var accuracy = 1;
    var power = 90;
    var type = 1;
    var chance = accuracy*aaccuracy/baccuracy;
    if(Math.random()<chance){
        if(bol==0){
            if(Math.random()>0.9){
                mestado = 1;
            }
            var atk = ((50+2*Statusg[pokeatual][3]+5)*meunvl/100);
            var dfs = ((50+2*Statusg[inimigoatual][4]+5)*ininvl/100);
            var damg = damage(meunvl, atk, power, dfs, type, inimigoatual, 1, bol);
            inivida-=damg;
            bmessage = pokes[inimigoatual]+" levou "+damg.toFixed(0)+" de dano!";
        }else if(bol==1){
            if(Math.random()>0.9){
                iestado = 1;
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
var money = 10
var comp = 1
var bag=[,];
bag[1]= 0
bag[2]=0
var bagoverlay = false;
var bagovs = 1;


//transição
var tela = 1;
var spr1 = new Image();
var spr2 = new Image();

//batalha
var pokeatual, meunvl, vida, maxvida, inimigoatual, ininvl, inivida, maxinivida, Statusg=[], pokes=[], moves=[], tipos=[], lvs=[], mboost=[], iboost=[];
var yatk = 0;
var xatk = 0;
var bmessage;
var battlemode = 0;
var xplayer = 300;
var xini = 500;
var click;
var inimigoatk = 0;
var mseed = false;
var iniseed = false;
var mestado = 0;
var iestado = 0;
var meuestado = new Image();
var iniestado = new Image();
var mrecharge = false;
var irecharge = false;
var flinch = false;
//errar e acertar
var maccuracy = 1, mevasion = 1, iaccuracy = 1, ievasion = 1, a = 1;
pokes = [0,"Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];
//moves: parou no Metapod
moves = [0,[Tackle, LeechSeed, PoisonPowder, RazorLeaf],[SleepPowder, LeechSeed, PoisonPowder, RazorLeaf],[SleepPowder, LeechSeed, PoisonPowder, SolarBeam],[Scratch, Ember, 0, 0],[Slash, Ember, 0, 0],[FireBlast, Flamethrower, BodySlam, Earthquake],[Tackle, Bubble, Bite, 0],[Tackle, WaterGun, Bite, MegaPunch],[HydroPump, WaterGun, Bite, MegaPunch],[Tackle, 0, 0, 0],[Tackle, Harden, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Tackle, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],
[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0],[Splash, 0, 0, 0]];
//status: parou no Nidoking
Statusg = [0,[45,49,49,65,65,45],[60,62,63,80,80,60],[80,82,83,100,100,80],[39,52,43,60,50,65],[58,64,58,80,65,80],[78,84,78,109,85,100],[44,48,65,50,64,43],[59,63,80,65,80,58],[79,83,100,85,105,78],[45,30,35,20,20,45],[50,20,55,25,25,30],[60,45,50,90,80,70],[40,35,30,20,20,50],[45,25,50,25,25,35],[65,90,40,45,80,75],[40,45,40,35,35,56],[63,60,55,50,50,71],[83,80,75,70,70,101],[30,56,35,25,35,72],[55,81,60,50,70,97],[40,60,30,31,31,70],[65,90,65,61,61,100],[35,60,44,40,54,55],[60,95,69,65,79,80],[35,55,40,50,50,90],[60,90,55,90,80,110],[50,75,85,20,30,40],[75,100,110,45,55,65],[55,47,52,40,40,41],[70,62,67,55,55,56],[90,92,87,75,85,76],[46,57,40,40,40,50],[61,72,57,55,55,65],[81,102,77,85,75,85],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],
[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50],[50,50,50,50,50,50]]
//Types
tipos=[0,[4,7],[4,7],[4,7],[1],[1],[1,9],[2],[2],[2],[11],[11],[11,9],[11,7],[11,7],[11,7],[0,9],[0,9],[0,9],[0],[0],[0,9],[0,9],[7],[7],[3],[3],[8],[8],[7],[7],[7,8],[7],[7],[7,8],[17],[17],[1],[1],[0,17],[0,17],[7,9],[7,9],[4,7],[4,7],[4,7],[11,4],[11,4],[11,7],[11,7],[8],[8],[0],[0],[2],[2],[6],[6],[1],[1],[2],[2],[2,6],[10],[10],[10],[6],[6],[6],[4,7],[4,7],[4,7],[2,7],[2,7],[12,6],[12,6],[12,6],[1],[1],[2,10],[2,10],[3,16],[3,16],[0,9],[0,9],[0,9],[2],[2,5],[7],[7],[2],[2,5],[13,7],[13,7],[13,7],[12,8],[10],[10],[2],[2],[3],[3],[4,10],[4,10],[8],[8],[6],[6],[0],[7],[7],[8,12],[8,12],[0],[4],[0],[2],[2],[2],[2],[2],[2,10],[10,17],[9,11],[5,10],[3],[1],[11],[0],[2],[2,9],[2,5],[0],[0],[2],[3],[1],[0],[12,2],[12,2],[12,2],[12,2],[12,9],[0],[5,9],[3,9],[1,9],[14],[14],[14,9],[10],[10]];
//niveis de evolução
lvs=[0,16,32,-1,16,36,-1,16,36,-1]
//status boost
mboost=[0,0,0,0,0];
iboost=[0,0,0,0,0];
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
    vida = vida+20;
    if(vida > maxvida){
        vida = maxvida
    }
}
function spotion(){
    vida = vida+50;
    if(vida > maxvida){
        vida = maxvida
    }
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
    if(bagoverlay == true){
        if(bagovs == 1 && bag[1] > 0){potion(); bag[1]-=1}
        if(bagovs == 2 && bag[2] > 0){spotion(); bag[2]-=1}
    }
    if(tela == 4 && money >= 10){
        if(comp == 1){
            bag[1]+=1;
            money = money-10
        }
        if(comp == 2 && money >= 50){
            bag[2]+=1;
            money = money-50
        }
    }
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
    }else if(tela==3){
        if(battlemode==0){
            if(fob == 2){
                bagoverlay = true
            }
            if(fob==1){
                battlemode=1;
            }
        }else if(battlemode==1){
            if(xatk==0 && yatk==0 && moves[pokeatual][0] != 0){
                bmessage = pokes[pokeatual]+" usou "+moves[pokeatual][0].name;
                battlemode=2;
            }else if(xatk==1 && yatk==0 && moves[pokeatual][1] != 0){
                bmessage = pokes[pokeatual]+" usou "+moves[pokeatual][1].name;
                battlemode=2;
            }else if(xatk==0 && yatk==1 && moves[pokeatual][2] != 0){
                bmessage = pokes[pokeatual]+" usou "+moves[pokeatual][2].name;
                battlemode=2;
            }else if(xatk==1 && yatk==1 && moves[pokeatual][3] != 0){
                bmessage = pokes[pokeatual]+" usou "+moves[pokeatual][3].name;
                battlemode=2;
            }
        }else if(battlemode==2){
            click++;
            if(click == 1){
                if(mestado == 5){
                    if(Math.random()>0.6){
                        mestado = 0;
                    }
                }
                if(mestado != 5){
                    if(mestado == 3){
                        a = Math.random();
                    }
                    if(a > .5){
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
                        a = 1;
                    }else{
                        bmessage = "Está paralizado!"
                        a = 1;
                    }
                }else{
                    bmessage = pokes[pokeatual]+" está em um sono profundo";
                }
            }else if(click==2){
                if(inivida==0){
                    tela = 2;
                    money += 5;
                    battlemode=0;
                    bmessage = "";
                    inimigoatual = Math.ceil(Math.random()*151);//151 para todos
                    arenaescolher = Math.ceil(Math.random()*3);
                    ininvl++;
                    meunvl++;
                    click=0;
                    if(lvs[pokeatual]!=-1 && lvs[pokeatual]<=meunvl){
                        pokeatual++;
                    }
                }else{
                    if(!flinch){
                        do{
                            inimigoatk = Math.floor(Math.random()*3);
                        }while(moves[inimigoatual][inimigoatk]==0);
                        bmessage = pokes[inimigoatual]+" usou "+moves[inimigoatual][inimigoatk].name;
                    }else{
                        bmessage = pokes[inimigoatual]+" exitou!";
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
                if(iestado != 5){
                    if(irecharge == false){
                        if(iestado == 3){
                            a = Math.random();
                        }
                        if(a > .5){
                            moves[inimigoatual][inimigoatk](1,iaccuracy,maccuracy);
                            if(vida<0){
                                vida=0;
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
                    bmessage = pokes[inimigoatual]+" está em um sono profundo";
                }
            }else if(click == 4){
                if(mseed == true){
                    vida-=maxvida/8;
                    inivida+=maxvida/8;
                }
                if(iniseed == true){
                    inivida-=maxinivida/8;
                    vida+=maxinivida/8;
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
            }else if(click == 5){
                gameover();
                if(mrecharge == false){
                    click=0;
                    battlemode = 0;
                }else{
                    mrecharge = false;
                    click=1;
                    battlemode = 2;
                    bmessage = " Esta recarregando"
                }
            }
        }
    }}

//se apertar backspace executar!
function backspace(){
if(tela == 2){tela = 4}else if(tela == 4){tela =2}
if(tela == 3){bagoverlay = false}
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
        ctx.drawImage(spr1, 0, 50, 200, 200);
        ctx.restore();
        spr2.src = "Images/Sprites/"+inimigoatual+".png";
        ctx.drawImage(spr2, xini, 160, 200, 200);
        

        //desenhar barras de vida
        ctx.drawImage(chat, 10, 15, 240, 60);
        ctx.drawImage(chat, 550, 15, 240, 60);
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
    }
    if(tela == 4){
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
        mart.src = "images/fundo/pokemart.jpg"
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

draw()
