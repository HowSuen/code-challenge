// Assumption: n is a non-negative integer, i.e. 0, 1, 2, ...

var sum_to_n_a = function(n) {
    // your code here
    // Using For-loop
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }
    return result;
};

var sum_to_n_b = function(n) {
    // your code here
    // Using Recursion
    // Base Case
    if (n <= 0) {
        return 0;
    }
    // Recursive Step
    return sum_to_n_b(n - 1) + n;
};

var sum_to_n_c = function(n) {
    // your code here
    // Mathematical Formula of sum of n terms from A to B: y
    // sum = n(A + B)/2
    return n * (1 + n) / 2;
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));