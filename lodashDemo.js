var _ = require("lodash");

// create array of integers from 1 - 14 (doesn't include end)
const nums = _.range(1, 15);
console.log(nums); // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

// take an array and chunk it into an array of arrays of length 3
const chunks = _.chunk(nums, 3);
console.log(chunks); // =>[ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10, 11, 12 ], [ 13, 14 ] ]

// gets a slice of an array from the end of the length 2.
const right = _.takeRight(nums, 2);
console.log(right); // => [ 13, 14 ]
