const ctx = document.getElementById("canvas").getContext("2d");
const backgroundImg = new Image();
backgroundImg.src = "../img/backgroundCanvas.jpg";

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    ctx.drawImage(backgroundImg, 0, 0, 800, 650);
    myGameArea.start();
  }

  const myGameArea = {
    canvas: document.getElementById("canvas"),
    points: 0,
    frames: 0,
    speed: 0,
    items: [],
    start: function () {
      this.interval = setInterval(updateGameArea, 20);
    },

    clear: function () {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    fallDownFaster() {
      if (this.frames % 240 === 0) {
        this.speed += 1;
      }
    },
    score: function () {},
    stop: function () {
      clearInterval(this.setInterval);
    },
  };

  class Background {
    constructor(source) {
      this.img = new Image();
      this.img.src = source;
      this.x = 0;
      this.y = 0;
    }

    draw() {
      ctx.drawImage(this.img, this.x, this.y, 800, 650);
    }
  }
  const background = new Background("../img/backgroundCanvas.jpg");

  class Eater {
    constructor(x, y) {
      this.img = new Image();
      this.img.src = "../img/eater.jpg";
      this.x = x;
      this.y = y;
      this.speed = 0;
      this.width = 100;
      this.height = 160;
    }

    draw() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    moveLeft() {
      if (this.x > 10) {
        this.x -= 30;
      }
    }
    moveRight() {
      if (this.x < 690) {
        this.x += 30;
      }
    }
    top() {
      return this.y;
    }
    bottom() {
      return this.y + this.height;
    }
    left() {
      return this.x;
    }
    right() {
      return this.x + this.width;
    }
    checkIfPick() {
      return !(
        this.top() > obst.bottom() ||
        this.bottom() < obst.top() ||
        this.left() > obst.right() ||
        this.right() < obst.left()
      );
    }
    checkItem() {}
  }
  const eater = new Eater(360, 490);

  class Food {
    constructor(image, x, good, bad) {
      this.x = x;
      this.y = 0;
      this.width = width;
      this.height = height;
    }
    draw() {}
    fallDown() {
      this.y += myGameArea.speed;
    }
    top() {
      return this.y;
    }
    bottom() {
      return this.y + this.height;
    }
    left() {
      return this.x;
    }
    right() {
      return this.x + this.width;
    }
  }

  function updateFood() {
    myGameArea.frames += 1;
    fallDownFaster();
    for (let i = 0; i < myGameArea.items.length; i += 1) {
      myGameArea.items[i].fallDown();
      myGameArea.items[i].draw();
    }

    if (myGameArea.frames % 120 === 0) {
      myGameArea.points += 1;
      const aviao = '../img/aviao.jpg';
      const banana = '../img/banana.jpg';
      const batata = '../img/batata.jpg';
      const bola = '../img/bola.jpg';
      const celular = '../img/celular.jpg';
      const ferramenta = '../img/ferramenta.jpg';
      const melancia = '../img/melancia.jpg';
      const pizza = '../img/pizza.jpg';
      const suco = '../img/suco.jpg';
      const tenis = '../img/tenis.jpg';
      let width;
      let height;
      if (
        aviao ||
        ferramenta ||
        melancia ||
        tenis ||
        pizza
      ) {
        width = 65;
        height = 45;
      } else if (
        banana ||
        batata ||
        celular ||
        suco ||
        bola
      ) {
        width = 45;
        height = 60;
      }
      let good = [banana, batata, melancia, pizza, suco];
      let bad = [aviao, bola, celular, ferramenta, tenis];
      myGameArea.items.push(new Food(good, bad));
    }
  }

  function updateGameArea() {
    myGameArea.clear();
    background.draw();
    eater.draw();
    updateFood();
  }

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 37) {
      eater.moveLeft();
    } else if (e.keyCode === 39) {
      eater.moveRight();
    }
  });
};