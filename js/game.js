/* Proměnná odkazuje na prvek  canvas */
var canvas = document.getElementById("canvas");
/* Vytvoření grafického kontextu 2d */
var ctx = canvas.getContext("2d");
var background = new Image();
background.src = "img/stars.jpg";
/* Grafický kurzor */
var cursor = {
    /* Atributy objektu */
    x: 400,
    y: 300,
    width: 50,
    height: 50,
    fillStyle: "rgba(255,255,255,0)",
    speed: 5,
    direction: "right",
    image: new Image(),
    urlImage: "img/boy.png",
    /* Metody objektu */
    paint: function(ctx) {
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
        this.image.src = this.urlImage;
        ctx.drawImage(
            this.image,
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.fillText(this.speed, this.x, this.y);
    },
    move: function(code) {
        switch (code) {
            case "ArrowUp":
                this.y =
                    this.y + this.height / 2 < 0 ?
                    canvas.height + this.height / 2 :
                    this.y - this.speed;
                this.direction = "up";
                break;
            case "ArrowDown":
                this.y =
                    this.y - this.height / 2 > canvas.height ?
                    -this.height / 2 :
                    this.y + this.speed;
                this.direction = "down";
                break;
            case "ArrowLeft":
                this.x =
                    this.x + this.width / 2 < 0 ?
                    canvas.width + this.width / 2 :
                    this.x - this.speed;
                this.direction = "left";
                break;
            case "ArrowRight":
                this.x =
                    this.x - this.width / 2 > canvas.width ?
                    -this.width / 2 :
                    this.x + this.speed;
                this.direction = "right";
                break;
            case "NumpadAdd":
                this.speed++;
                break;
            case "NumpadSubtract":
                this.speed--;
                break;
            case "Space":
                this.speed = 0;
                break;
            case "Enter":
                this.speed = 3;
                break;
        }
    },
    animate: function() {
        if (this.direction == "left") this.x -= this.speed;
        if (this.direction == "right") this.x += this.speed;
        if (this.direction == "up") this.y -= this.speed;
        if (this.direction == "down") this.y += this.speed;
        if (this.x + this.width / 2 > canvas.width) this.direction = "left";
        if (this.x - this.width / 2 < 0) this.direction = "right";
        if (this.y + this.height / 2 > canvas.height) this.direction = "up";
        if (this.y - this.height / 2 < 0) this.direction = "down";
    }
};

function clearCanvas(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    canvas.style.border = "2px solid black";
}

function paint() {
    clearCanvas("white");
    cursor.paint(ctx);
}

canvas.addEventListener("click", function(event) {
    cursor.x = event.offsetX;
    cursor.y = event.offsetY;
    paint();
});

document.addEventListener("keydown", function(event) {
    cursor.move(event.code);
    paint();
});

window.setInterval(function() {
    cursor.animate();
    paint();
}, 40);

paint();