class Road{
    constructor(x,width,lanecount=4){

        this.x=x;
        this.width=width;
        this.lanecount=lanecount;

        this.left=x-width/2;
        this.right=x+width/2;

        const infinity=1000000;
        this.top=-infinity;
        this.bottom=infinity;
    }

    gatLaneCeter(laneIndex){
        const lineWidth=this.width/this.laneCount;
        return this.left+laneWidth/2+laneIndex*laneWidth;
            Math.min(laneIndex,this.laneCount-1)*laneWidth;
    }

    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle='white';

        for(let i=0;i<=this.lanecount;i++){
            const x=lerp(
                this.left,
                this.right,
                i/this.lanecount
            );
            
            if(i>0 && i<this.lanecount){
                ctx.setLineDash([20,20]);
            }
            else{
                ctx.setLineDash([]);
            }
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();

        }
    }
}