function init(){
    canvas=document.getElementById("mycanvas");
    W=H=canvas.width=canvas.height=1000;
    cs=67;
    speed=20;
    pen=canvas.getContext("2d");
    food=getrandomfood();
    game_over=false;
    food_img=new Image();
    food_img.src="apple.png";
    score=0;
    trophy=new Image();
    trophy.src="trophy.png";
    snake={
        init_Len:5,
        cells:[],
        color:"yellow",
        direction:"right",

        createsnake:function(){
            for(var i=this.init_Len;i>0;i--)
            {
                this.cells.push({x:i,y:0});
            }
        },
        
        drawsnake:function(){
            for(var i=0;i<this.cells.length;i++)
            {
                pen.fillStyle=this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
        },

        updatesnake:function(){
            var X=this.cells[0].x;
            var Y=this.cells[0].y;
            if(X==food.x&&Y==food.y)
            {
                food=getrandomfood();
                score++;
            }else
            {
                this.cells.pop();
            }
            var nextX,nextY;
            if(this.direction=="right")
            {
                nextX=X+1;
                nextY=Y;
            }else if(this.direction=="left")
            {
                nextX=X-1;
                nextY=Y;
            }else if(this.direction=="down")
            {
                nextX=X;
                nextY=Y+1;
            }else if(this.direction=="up")
            {
                nextX=X;
                nextY=Y-1;
            }
            this.cells.unshift({x:nextX,y:nextY});
            var lastx=Math.round(W/cs);
            var lasty=Math.round(H/cs);
            if(this.cells[0].x<0||this.cells[0].y<0||this.cells[0].x>lastx||this.cells[0].y>lasty)
            {
                game_over=true;
            }
        }
    };
    snake.createsnake();
    function keypressed(e){
        if(e.key=="ArrowRight")
        {
            snake.direction="right";
        }else if(e.key=="ArrowDown")
        {
            snake.direction="down";
        }else if(e.key=="ArrowUp")
        {
            snake.direction="up";
        }else
        {
            snake.direction="left";
        }
    }
    document.addEventListener("keydown",keypressed);
}
function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawsnake();
    pen.fillStyle="red";
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophy,10,30);
    pen.fillStyle="blue";
    pen.font="20px Roboto";
    pen.fillText(score,50,50);
}
function update(){
   snake.updatesnake();
}
function getrandomfood(){
    var foodx=Math.round(Math.random()*(W-cs)/cs);
    var foody=Math.round(Math.random()*(H-cs)/cs);
    var food={
        x:foodx,
        y:foody,
        color:"aqua",
    }
    return food;
}
function loop(){
    if(game_over==true)
    {
        clearInterval(f);
    }
    draw();
    update();
}

init();
var f=setInterval(loop,100);