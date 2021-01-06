const canvas = document.getElementById('dino');
canvas.style = "border:2px solid grey";

const ctx = canvas.getContext('2d');
 
let score;
let player;
let gravity;
let cactis= [];
let pteros= [];
let gameSpeed;
var clavier = [] ;


document.addEventListener("keydown",function(e){
    clavier[e.code] = true;
});
document.addEventListener("keyup",function(e){
    clavier[e.code] = false;
});



class Player {

    constructor(x, y, w, h){   

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;


        this.dy = 0;
        this.jumpF = 8;
        this.origH = h;
        this.groundHit = false;
        this.jumpHold = 0;
    }
    
    Animate(){

        if(clavier['Space'] || clavier['ArrowUp']){
            this.Jump();
        }else{
            this.jumpHold = 0;
        }
        this.y += this.dy;

        if(this.y + this.h <canvas.height){
            this.dy += gravity;
            this.groundHit = false;
        }else{
            this.dy = 0;
            this.gourndHit = true;
            this.y = canvas.height - this.h;
        }
      
        this.Draw(); 
     }
     Jump(){
        if(this.gourndHit && this.jumpHold == 0){
            this.jumpHold = 1;
            this.dy -= this.jumpF;
        }else if (this.jumpHold > 0 && this.jumpHold < 10){
            this.jumpHold+=0.5;
            this.dy = -this.jumpF - (this.jumpHold/60);
        }

     }

    Draw(state){
        let img = new Image ();
        img.src = "./img/t-rex.png" ;
        ctx.drawImage(img,this.x, this.y, this.w, this.h) ;
     
    }


   
}

class Cactus{
    constructor(x, y, w, h){   

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.dx = -gameSpeed;
    }
   
    Update(){
        this.x += this.dx;
        this.Draw();
        this.dx = -gameSpeed;
    }

    Draw(){
        let img2  = new Image();
        img2.src  = "./img/cacti.png" 
        ctx.drawImage(img2,this.x , this.y , this.w, this.h) ;

    }
}



class Ptero{
    constructor(x, y, w, h){   

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.dx = -gameSpeed;
    }
   
    Update(){
        this.x += this.dx;
        this.Draw();
        this.dx = -gameSpeed;
    }

    Draw(){
        let img2  = new Image();
        img2.src  = "./img/fly.png" 
        ctx.drawImage(img2,this.x , this.y , this.w, this.h) ;

    }
}



function SpawnCactus(){
let cacti = new Cactus(800+50, 300-50, 50, 50);
cactis.push(cacti);
}

function SpawnPtero(){
    let ptero = new Ptero(800+50, 200-50, 50, 50);
    pteros.push(ptero);
}

function Start (){
 
    canvas.widht = 800;
    canvas.height = 300;
    console.log(canvas.widht);


    gameSpeed = 2;
    gravity = 1;
    score = 0;

    player = new Player(35, 0 , 50, 50 );
    //console.log(player);
    player.Draw();
    requestAnimationFrame(update);

}
let iST = 200;
let iSTP = 400;
let sT = iST;
let sTP = iSTP;
function update (){

    requestAnimationFrame(update);
    ctx.clearRect(0, 0, canvas.widht ,canvas.height);
    var imgR = new Image();
    imgR.src = "./img/road.png"
    ctx.drawImage(imgR ,0,290,canvas.widht, 10 );
    let state = 1;

    
    sT--;
    sTP--;
    if(sT <=0){
        SpawnCactus();
        //console.log(cactis);
        sT = iST - gameSpeed * 10;
        if(sT < 60){
            sT = 60;
        }
    }
    for(let i = 0 ; i< cactis.length ; ++i){
        let c = cactis[i];
        if(c.x + c.w < 0){ cactis.splice(i,1);}
//https://developer.mozilla.org/fr/docs/Games/Techniques/2D_collision_detection
        if(player.x < c.x + c.w && 
            player.x + player.w > c.x && 
            player.y < c.y + c.h &&
             player.y + player.h > c.h){
                cactis = [];
                sTP = iST;
                gameSpeed = 2;
                window.location.reload(); 
            }
        //console.log(cactis);
        c.Update();
    }

    if(sTP <=0){
        SpawnPtero();
       
        sTP = iSTP - gameSpeed * 10;
        if(sTP < 30){
            sTP = 300;
        }
    }
    for(let i = 0 ; i< pteros.length ; ++i){
        let p = pteros[i];
        if(p.x + p.w < 0){ cactis.splice(i,1);}

        if(player.x < p.x + p.w && player.x + player.w > p.x && 
            player.y < p.y + p.h && player.y + player.h > p.h){
                pteros = [];
                sTP = iSTP;
                gameSpeed = 2;
                window.location.reload(); 
            }

        p.Update();
    
    }
    ctx.fillText('Score: ' + score + 'm', canvas.widht - 70, 30);
    player.Animate();
    score+=1;
    gameSpeed+=0.0025;
}

Start();
