function subarraySum(array, target) {
    let map = new Map();
    let sumTotal = 0;

    for (let index = 0; index < array.length; index++) {
        sumTotal += array[index];
        if (sumTotal === target) return [0, index];
        
        let res = sumTotal - target;
        if(map.has(res)) return [map.get(res) + 1, index];

        map.set(sumTotal, index);
    }

    return [];
}

///////////////////////////////////////////////////////////////

function removeDuplicates(array) {
    let set = new Set(array);
    return Array.from(set);
}
let array = [1,2,3,4,5,6,6,6,6]
console.log(removeDuplicates(array));

//////////////////////////////////////////////////////////////

function hasUniqueChars(string) {
    let set = new Set(string.split(""));
    if(set.size === string.length) return true;
    return false;
}

console.log(hasUniqueChars("dowo"));
console.log(hasUniqueChars("prueba"));
console.log(hasUniqueChars("hola"));

//////////////////////////////////////////////////////////////

function findPairs(array1, array2, target) {
    let array1Filtered = new Set(array1);
    let array2Filtered = new Set(array2);
    let result = [];

    for (const element of array1Filtered) {
        for (const element2 of array2Filtered) {
            if((element + element2) === target) result.push([element, element2]);
        }
    }
    return result;
}

/////////////////////////////////////////////////////////////

function longestConsecutiveSequence(array) {
    let set = Array.from(new Set(array.sort((a, b) => a - b)));
    let result = [];
    let counter = 1;
    if(set.length < 1) return 0;
    for (let index = 0; index < set.length - 1; index++) {
        if(set[index] + 1 === set[index+1]){
            counter++;
        }else{
            result.push(counter);
            counter = 1;
        }
    }
    result.push(counter);
    return result.sort((a, b) => a - b).pop();
}
