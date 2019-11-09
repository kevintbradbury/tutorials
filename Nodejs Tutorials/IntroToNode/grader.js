var scores1 = [90, 98, 89, 100, 86, 94];
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

function average(arr){
    var sum = 0;
    var count = arr.length;
    var average = 0;
    
    // for(var i = 1; i < count; i++) {
    //     sum += arr[i];
    // }
    arr.forEach(function(index){
        sum += index;
    });
    
    return Math.round(sum / count);
    // console.log(average);
}

console.log(average(scores1));
console.log(average(scores2));
