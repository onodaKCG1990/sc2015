Number.prototype.plus = function ( num ) {
  return this + num;
};
Number.prototype.minus = function ( num ) {
  return this - num;
};

Number.prototype.multi = function ( num ) {
  return this * num;
};


Number.prototype.division = function ( num ) {
  return this / num;
};

var number = 100;
var result1 = number.plus(1000);
var result2 = number.minus(10);
var result3 = number.multi(100);
var result4 = number.division(2);
console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);

