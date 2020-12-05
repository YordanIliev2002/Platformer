function colides(one, two) {
    var h = (((one.x + one.width) <= two.x) || ((two.x + two.width) <= one.x));
    var v = (((one.y + one.height) <= two.y) || ((two.y + two.height) <= one.y));

    return !(h | v);
}

function distanceSquared(a, b) {
    return (a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y);
}

function coinCollides(p, c) {
    var res = false;
    res |= distanceSquared({x:p.x,y:p.y},c) <= c.radius*c.radius;
    res |= distanceSquared({x:p.x + p.width,y:p.y},c) <= c.radius*c.radius;
    res |= distanceSquared({x:p.x + p.width,y:p.y+p.height},c) <= c.radius*c.radius;
    res |= distanceSquared({x:p.x,y:p.y+p.height},c) <= c.radius*c.radius;
    return res;
}