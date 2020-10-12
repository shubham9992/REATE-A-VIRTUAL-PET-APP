class Food{
    constructor(){
        //var foodStock,lastFed;
        this.foodStock=0;
        this.lastFed=0;
        this.image=loadImage("images/Milk.png");
    }

    getFoodStock(){
        // console.log("before "+Food);
        // var getFoodStockRef=database.ref('Food');
        // getFoodStockRef.on("value",function (data) {
        //     Food=data.val();
        // })
        // console.log("after "+Food);
        return this.foodStock;
    }
    getFedTime(lastFed){
        this.lastFed=lastFed;
    }
    updateFoodStock(foodStock){
        // database.ref('/').update({
        //     Food:foodUpdate
        // })
        this.foodStock=foodStock;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock-=1;
        }
    }
    
    display(){
        console.log("foodstock",this.foodStock);
        var x=80,y=100;
        
        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=80;
                    y+=50;
                }
                console.log("before");
                image(this.image,x,y,50,50);
                console.log("after");
                x+=30;
            }
        }
    }
}