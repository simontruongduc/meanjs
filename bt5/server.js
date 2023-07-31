var express = require('express');
var app = express();
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static(__dirname + "/public"));
app.use('/detail', express.static(__dirname + "/public"));
app.listen(7000);

let products = [
    {
        id : 1,
        name : "iphone 6",
        price : 1000,
        description : "this is iphone 6",
        image : 'images/iphone_6.jpeg'
    },
    {
        id : 2,
        name : "iphone 7",
        price : 1200,
        description : "this is iphone 7",
        image : 'images/iphone_7.jpeg'
    },
    {
        id : 3,
        name : "iphone 8",
        price : 1300,
        description : "this is iphone 8",
        image : 'images/iphone_8.jpeg'
    }
];
function getProductById(id){
    for (var i = 0 ; i < products.length ; i++){
        if (products[i].id == id){
            return products[i];
        }
    }
    return {};
}
app.get('/',function (req, res){
   res.render('index',{page:'product_list',data:products})
});

app.get('/detail/:id',function (req, res){
    var product =  {};
    new Promise(function (resolve, reject){
        product = getProductById(req.params.id);
        resolve(product)
    }).then(function (){
        res.render('index',{page:'product_detail',data:product})
    });
});