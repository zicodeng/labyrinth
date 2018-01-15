"use strict";
//Type declaration for reducer (e.g., for `array.reduce()`)
let reducer;
//assign an anonymous callback arrow function (concise body)
reducer = (curr, item) => curr + item;
let total = [1, 2, 3, 4].reduce(reducer); //works!
console.log(total); //10
//# sourceMappingURL=test.js.map