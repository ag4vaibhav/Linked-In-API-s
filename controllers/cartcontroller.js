const db= require('../models/')

function addCart(req,res,next){
    body=req.body;
    
    console.log("In add Cart",body);
    var obj=new db.Cart(body);
    console.log("Request Auth Data in add Category ----",req.authData);
    
    if(req.authData.group_type == "user")
    {
        obj.save(function (err, result) 
        {    
            if(err)
            {
                //console.log(err);
                res.status(404);
                res.send(err);
            }
            else
            {
             //   console.log(result);
                res.locals.saved_result=result;
               
                next();
            }
        });
    }
        else{
        console.log("Permission Denied to save Data in Cart!....");
        res.status(404);
        res.send("Permission Denied to save Data in Cart!....")
    }    
}

async function update_stock(req,res){

    result=res.locals.saved_result;

    console.log("result----",result);
    
    product_id=result.product_id;
    quantity=result.quantity;

    console.log("result----",result.product_id);
    
    var conditions = { _id: product_id },    
    
    post = db.Product.findOne(conditions);

    console.log("post.................",post);
    if(post.opening_stock + post.stock >= quantity){
        console.log("Stock Sold!.....");
        res.status(404);
        res.send("Stock Sold!.....");
    }
    else{
        console.log("Post ====",post);

        to_update = {$set : {'closing_stock' : post.opening_stock+post.stock-quantity}}
        options = { multi: true };

        console.log("Opening_Stock==",post.opening_stock+"Stock====",post.stock);

        await db.Product.updateOne(conditions,to_update,options,(err,result)=>{
            if(err){
                res.status(404);
                res.send(err);
            }
            else{
                console.log("Updated Product Stock",result);
                res.status(200);
                res.json(result);
            }
            
        });
    }

}

function viewCart(req,res,model){
    
    //console.log("In View Cart",req.body);

    //console.log("Request Auth Data in add Category ----",req.authData);
    
    if(req.authData.group_type == "user"){
        db.Cart.aggregate([
                {
                $lookup:
                  {
                    from: "products",
                    localField: "product_id",
                    foreignField: "_id",
                    as: "product_docs"
                  }
                },
                { $unwind : "$product_docs" },
                {
                    $lookup:
                        {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user_docs"
                        }
                },
                { $unwind : "$user_docs" }
           

        ]).exec((err, result_Cart) => {
            if (err){
                console.log(err);
                res.status(404);
                res.send(err);
            }
            else{
                console.log(result_Cart);
                res.status(200);
                res.json(result_Cart);
            }
          
        })

    }
    else{
        console.log("Permission Denied to View Data in Cart!....");
        res.status(404);
        res.send("Permission Denied to View Data in Cart!....");
    }    
}

module.exports={
    addCart,
    update_stock,
    viewCart
}