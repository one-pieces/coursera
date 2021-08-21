const getAll = function(arr){
    let res = [];
    get(arr,res,0);
    return res;
}
function get(arr,res = [],index = 0){
    if(index === arr.length - 1){
        res.push(arr.slice());
    }
    for(let i = index;i < arr.length;i++) {
        // console.log('arr: ', arr, index, i);
        [arr[index],arr[i]] = [arr[i],arr[index]];
        console.log('arr0: ', arr, index, i);
        get(arr,res,index + 1);
        [arr[index],arr[i]] = [arr[i],arr[index]];// 恢复现场
    }
}

console.log(getAll([1,2,3]))
