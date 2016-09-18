function loop() {
    window.requestAnimationFrame(loop),
    tick += opts.hueSpeed,
    ctx.shadowBlur = 0,
    ctx.fillStyle = "rgba(32,35,45,alp)".replace("alp", opts.repaintAlpha),
    ctx.fillRect(0, 0, w, h);
    for (var t = 0; t < opts.picksParTick; ++t)
        hexs[Math.random() * hexs.length | 0].pick();
    hexs.map(function(t) {
        t.step()
    })
}
function Hex(t, i) {
    this.x = t,
    this.y = i,
    this.sum = this.x + this.y,
    this.picked = !1,
    this.time = 0,
    this.targetTime = 0,
    this.xs = [this.x + cos, this.x, this.x - cos, this.x - cos, this.x, this.x + cos],
    this.ys = [this.y - sin, this.y - opts.side, this.y - sin, this.y + sin, this.y + opts.side, this.y + sin]
}
var w = dotty.width = window.innerWidth
  , h = dotty.height = window.innerHeight
  , sum = w + h
  , ctx = dotty.getContext("2d")
  , opts = {
    side: 15,
    picksParTick: 2,
    baseTime: 40,
    addedTime: 10,
    colors: ["rgba(0,200,170,alp)", "rgba(254,26,83,alp)", "rgba(255,216,0,alp)"],
    addedAlpha: 20,
    strokeColor: "rgb(43,45,53)",
    hueSpeed: .2,
    repaintAlpha: 1
}
  , difX = Math.sqrt(3) * opts.side / 2
  , difY = 3 * opts.side / 2
  , rad = Math.PI / 6
  , cos = Math.cos(rad) * opts.side
  , sin = Math.sin(rad) * opts.side
  , hexs = []
  , tick = 0;
Hex.prototype.pick = function() {
    this.color = opts.colors[Math.random() * opts.colors.length | 0],
    this.picked = !0,
    this.time = this.time || 0,
    this.targetTime = this.targetTime || opts.baseTime + opts.addedTime * Math.random() | 0
}
,
Hex.prototype.step = function() {
    var t = this.time / this.targetTime;
    ctx.beginPath(),
    ctx.moveTo(this.xs[0], this.ys[0]);
    for (var i = 1; i < this.xs.length; ++i)
        ctx.lineTo(this.xs[i], this.ys[i]);
    ctx.lineTo(this.xs[0], this.ys[0]),
    this.picked ? (++this.time,
    this.time >= this.targetTime && (this.time = 0,
    this.targetTime = 0,
    this.picked = !1),
    ctx.fillStyle = ctx.shadowColor = this.color.replace("alp", Math.sin(t * Math.PI)),
    ctx.fill()) : (ctx.strokeStyle = ctx.shadowColor = opts.strokeColor,
    ctx.stroke())
}
;
for (var x = 0; w > x; x += 2 * difX)
    for (var i = 0, y = 0; h > y; y += difY)
        ++i,
        hexs.push(new Hex(x + difX * (i % 2),y));
loop(),
window.addEventListener("resize", function() {
    w = dotty.width = window.innerWidth,
    h = dotty.height = window.innerHeight,
    sum = w + h,
    hexs.length = 0;
    for (var t = 0; w > t; t += 2 * difX)
        for (var i = 0, s = 0; h > s; s += difY)
            ++i,
            hexs.push(new Hex(t + difX * (i % 2),s))
});
