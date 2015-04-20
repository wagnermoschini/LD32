Math2 = {};

Math2.clamp = function(value, min, max)
{
    if (min === undefined) min = 0;
    if (max === undefined) max = 1;
    if (value < min)
    {
        value = min;
    }
    else if (value > max)
    {
        value = max;
    }

    return value;
}

Math2.sign = function(value)
{
    value = +value;
    if (value === 0 || isNaN(value)) return 1;
    return value > 0 ? 1 : -1;
}

Math2.pointAgainstTriangle = function(x, y, ax, ay, bx, by, cx, cy) 
{
    var px = x;
    var py = y;
    var planeAB = (ax - px)*(by - py)-(bx - px)*(ay - py);
    var planeBC = (bx - px)*(cy - py)-(cx - px)*(by - py);
    var planeCA = (cx - px)*(ay - py)-(ax - px)*(cy - py);
    return Math2.sign(planeAB) == Math2.sign(planeBC) && Math2.sign(planeBC) == Math2.sign(planeCA);
}

Math2.distance = function(ax, ay, bx, by)
{
    var xs = 0;
    var ys = 0;

    xs = bx - ax;
    xs = xs*xs;

    ys = by - ay;
    ys = ys*ys;

    return Math.sqrt(xs + ys);
}

module.exports = Math2;