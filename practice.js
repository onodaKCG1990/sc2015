Number.prototype.plus = function ( num ) {
  return this + num;
};

Number.prototype.multi = function ( num ) {
  return this * num;
};


Number.prototype.division = function ( num ) {
  return this / num;
};


var number = 8;
var result = number.plus(100);
var result2 = number.multi(100);
var result3 = number.division(2);
console.log(result);
