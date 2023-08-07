var express = require('express');
var app = express();
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static(__dirname + '/public'));
app.listen(3000);
const mongoose = require('mongoose');
var ticketModal = require('./models/Ticket');

mongoose.connect('mongodb+srv://simontruongduc:password.dwxwqbt.mongodb.net/mean2023_01')
    .then(() => {
        console.log('connected db success');
    })
    .catch(() => {
        console.log('connected db fail');
    });

var winTicket = [1,2,3,4,5,6];
var tickets = [];
var ticket = [];
var isWinning = false;
var index = 1;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
async function insertTickets(){
    await ticketModal.insertMany(tickets).then(()=>{
        tickets = [];
    }).catch((error) => {
        console.log(error);
    });
}
while (true){
    var number = random(1,45);
    if(ticket.indexOf(number) === -1){
        ticket[`number_${index}`] = number;
        isWinning = winTicket.indexOf(number) !== -1
    }

    if(ticket.length === 6){
        tickets.push(ticket);
        if(tickets.length === 100){
            await insertTickets();
        }
        if(isWinning){
            console.log('you win!')
            break;
        }
        ticket = [];
        index = 0;
    }
    index++;
}

