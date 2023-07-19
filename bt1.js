// random 3 card from array and score of 3 card
let arr = [1,2,3,4,5,6,7,8,9,10,'j','q','k'];
let arrResult = [];
let sumResult = 0;
let score = 0;
while(true){
  let random = arr[Math.floor(Math.random() * arr.length)];
  if(arrResult.indexOf(random) === -1){
    arrResult.push(random);
    if((['j','q','k']).indexOf(random) === -1){
        sumResult += random
    }
  }
  if(arrResult.length === 3){
    break;
  }
}
if(sumResult === 0){
  score = 'ba cào';
} else {
  score = sumResult%10;
}
console.log(arrResult.toString());
console.log('your score is : ' + score);
