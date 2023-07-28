var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static("public"))
app.listen(7000);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var cardProperties = ['clubs','diamonds','spades','hearts'];
var cardType = [2,3,4,5,6,7,8,9,10,'ace','jack','king','queen'];
var standardDeckOfPlayingCards = [];
var imgExtension = 'png';

function createStandardDeckOfPlayingCards() {
    standardDeckOfPlayingCards = [];
    for (var i = 0 ; i < cardType.length ; i++){
        for (var j = 0 ; j < cardProperties.length ; j++){
            standardDeckOfPlayingCards.push(`${cardType[i]}_of_${cardProperties[j]}.${imgExtension}`);
        }
    }
}

function renderHomePage(res) {
    res.render('home', {cards: standardDeckOfPlayingCards});
}
app.get('/card',function (req,res){
    new Promise(function (resolve, reject){
        createStandardDeckOfPlayingCards();
        resolve();
    }).then(function (){
        renderHomePage(res);
    });
});

app.get('/shuffle_card',function (req,res){
    if(standardDeckOfPlayingCards.length === 0){
        new Promise(function (resolve, reject){
            createStandardDeckOfPlayingCards();
        });
    }
    new Promise(function(resolve, reject) {
        let currentIndex = standardDeckOfPlayingCards.length,  randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [standardDeckOfPlayingCards[currentIndex], standardDeckOfPlayingCards[randomIndex]] = [
                standardDeckOfPlayingCards[randomIndex], standardDeckOfPlayingCards[currentIndex]];
        }
        resolve();
    }).then(function (){
        renderHomePage(res);
    });
});

