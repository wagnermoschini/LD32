Random = {};

Random.range = function(min, max, rounded) 
{
    var d = max - min;
    var r = min + Math.random()*d;
    return rounded ? Math.round(r) : r; 
}

module.exports = Random;