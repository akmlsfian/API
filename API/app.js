console.log('..Starting...');

 //=========================== discount===================================
 let discount = [];
 let discCode = [];
 let discPerc = [];
 //============================ item======================================
 let items = [];
 let itemid = [];
 let itemname = []; 
 let itemprice = []; 
 let itemnewprice = []; 
 let itemdiscountCode = []; 
 let itemdiscountprice= [];

 //======================= request json =================================

    //==== read path that is absolute at Desktop ====
    const path = require('path');
    const absolutePath = path.resolve('Desktop','API', 'data.json');

    console.log ("Reading JSON file at : " +absolutePath);

    //==== read json file ===
    const fs = require('fs');
    const jsonfile = fs.readFileSync(absolutePath);
    var data = JSON.parse(jsonfile);
    console.log(data);

    //================= insert data in JSON to object ===================
     items = data.item;
     discount = data.discount;

     //================= output log to see all data =====================
     console.log(items);
     console.log(discount);
     //=========== itterate all item to their own array =================

     console.log("==========================================");

     for(var k=0; k<items.length; k++){
         itemid[k]=items[k].itemID;
         itemname[k]=items[k].itemName;
         itemprice[k]=items[k].itemPrice;
         itemdiscountCode[k]=items[k].discountCode;
         //output item log
         console.log(itemid[k] + " " +itemname[k] + " " +itemprice[k]+ " " +itemdiscountCode[k]);
     }

     console.log("==========================================");

     //==========itterate discount data to their own array =============

     for(var l=0; l<discount.length; l++){
         discCode[l]=discount[l].discountCode;
         discPerc[l]=discount[l].discountPerc;
         //output discount log
         console.log(discCode[l] + " " +discPerc[l]);
     }

     console.log("==========================================\n");

     for(var i=0; i<items.length; i++){
         for(var j=0; j<discount.length; j++){
             if(itemdiscountCode[i] == discCode[j]){
                 //============ discountprice calculation ===================
                 itemdiscountprice[i]=(itemprice[i] *(discPerc[j])/100).toFixed(2);
                 itemnewprice[i]=itemprice[i]-itemdiscountprice[i];
                 console.log(itemdiscountCode[i] + " : RM"+ itemdiscountprice[i] );
                 console.log("New price for " +itemname[i] + " from : RM" +itemprice[i] + " to : RM" +itemnewprice[i]);
             }
         }
     }


    //=========== itterate all items data to temporarry object ===============
     let temp=[];

    for(var i=0; i<items.length; i++){
        temp[i] = { discountCode : (itemdiscountCode[i]), discountPrice : (itemnewprice[i]), itemID : (itemid[i]), itemName : (itemname[i]), itemPrice : (itemprice[i])};
    }

        console.log(temp);
//=================== writing output JSON files ======================================
    output = JSON.stringify(temp,null,2);

     fs.writeFile("./output.json" , output, function(err){
        if(err){ console.log(err);}
        else{ console.log("Output has been writen succesfully as JSON file");}
    } )

//===================== Output to localhost:3000 =====================

const http = require('http');
const port = 3000;

const server = http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain'})
    
    res.write('  --= End User Output =--\n\n');

    for(var k=0; k<items.length; k++){
        //output item log
        res.write(" Item ID : " + itemid[k] + "\n Item Name : " +itemname[k] + "\n Item Price : RM " +itemprice[k]+ "\n Discount Code : " +itemdiscountCode[k] + "\n Price After Discount : RM " + itemnewprice[k] + '\n\n');
    }

    res.end();
})

server.listen(port, function(error){
    if (error){
        console.log('Something went wrong', error);
    }
    else{
        console.log('Server is listening on port : ' + port);
     }

})




