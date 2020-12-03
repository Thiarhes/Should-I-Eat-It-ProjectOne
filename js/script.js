const ctx = document.getElementById("canvas").getContext("2d");
const backgroundImg = new Image();
backgroundImg.src = "../img/background.jpg";

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
    speed: 1,
    creationTime: 120,
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
        if (this.creationTime > 20) {
          this.creationTime -= 6;
        }
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
  const background = new Background("../img/background.jpg");

  class Eater {
    constructor(x, y) {
      this.img = new Image();
      this.img.src = "../img/eater.png";
      this.x = x;
      this.y = y;
      this.speed = 0;
      this.width = 200;
      this.height = 160;
    }

    draw() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    moveLeft() {
      if (this.x > 10) {
        this.x -= 80;
      }
    }
    moveRight() {
      if (this.x < 600) {
        this.x += 79;
      }
    }
    top() {
      return this.y + this.height / 3;
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
    constructor(source, x, good) {
      this.image = new Image();
      this.image.src = source;
      this.x = x;
      this.y = 0;
      this.good = good;
      this.width = 65;
      this.height = 62;
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
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
    myGameArea.fallDownFaster();
    for (let i = 0; i < myGameArea.items.length; i += 1) {
      myGameArea.items[i].fallDown();
      myGameArea.items[i].draw();
    }

    if (myGameArea.frames % myGameArea.creationTime === 0) {
      myGameArea.points += 1;
      // seleção aleatoria do alimento
      const airplane = "../img/airplane.png";
      const banana = "../img/banana.png";
      const fries = "../img/fries.png";
      const ball = "../img/ball.png";
      const cell = "../img/cell.png";
      const tool = "../img/tool.png";
      const watermelon = "../img/watermelon.png";
      const pizza = "../img/pizza.png";
      const juice = "../img/juice.png";
      const sneakers = "../img/sneakers.png";
      const foods = [
        airplane,
        banana,
        fries,
        ball,
        cell,
        tool,
        watermelon,
        pizza,
        juice,
        sneakers,
      ];
      const randomNumber = Math.floor(Math.random() * foods.length);
      const randomFood = foods[randomNumber];

      // verificando se o alimento é bom ou ruim
      let good = false;
      if (
        randomFood === banana ||
        randomFood === fries ||
        randomFood === watermelon ||
        randomFood === pizza ||
        randomFood === juice
      ) {
        good = true;
      }

      // posição aleatória da criação do alimento
      const position = Math.floor(Math.random() * (800 - 65));

      // instanciando a classe Food
      myGameArea.items.push(new Food(randomFood, position, good));
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
