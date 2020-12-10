const ctx = document.getElementById("canvas").getContext("2d");
const backgroundImg = new Image();
backgroundImg.src = "img/background.jpg";

let bestScore;
data = parseInt(localStorage.getItem(`bestScore`));
bestScore = isNaN(data)?0:data;

window.onload = () => {
  document.querySelector(".start-button").onclick = () => {
    startGame();
    effects[4].play();
  };

  function startGame() {
    ctx.drawImage(backgroundImg, 0, 0, 800, 650);
    myGameArea.start();
  }
// função que esconde o botão e as instruções quando o player inicia o jogo
  function hiddenButton() {
    const magicButton = document.querySelector(".start-button");
    const instructions = document.querySelector(".instructions");
    magicButton.classList.add("hidden");
    instructions.classList.add("hidden");
  }
// função que mostra uma "mensagem" imagem no lugar do botão e das instruções
  function showMessage() {
    const show = document.querySelector(".message");
    const hr = document.querySelector(".hr");
    hr.classList.remove("hidden");
    show.classList.remove("hidden");
  }

  const myGameArea = {
    canvas: document.getElementById("canvas"),
    points: 0,
    frames: 0,
    speed: 1,
    creationTime: 120,
    items: [],
    lives: 5,
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
    score: function () {
      ctx.fillStyle = "black";
      ctx.font = "18px serif";
      ctx.fillText(`SCORE: ${this.points}`, 10, 20);
    },
    bestScore: function () {
      ctx.fillStyle = 'green';
      ctx.font = '18px monospace';
      ctx.fillText(`BEST SCORE: ${bestScore}`, 150, 20);
    },
    livesDown: function () {
      ctx.fillStyle = "red";
      ctx.font = "18px serif";
      ctx.fillText(`LIVES: ${this.lives}`, 700, 20);
    },
    stop: function () {
      clearInterval(this.interval);
      setTimeout(this.gameOver, 1000);
      effects[3].play();
      effects[4].pause();
    },
    gameOver: function () {
      ctx.font = "80px Verdana";
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
      gradient.addColorStop("0.6", "magenta");
      gradient.addColorStop("0.2", "blue");
      gradient.addColorStop("0.7", "red");
      gradient.addColorStop("0.4", "black");
      // Fill with gradient
      ctx.fillStyle = gradient;
      ctx.fillText("GAME OVER!", 160, 300);
    },
  };

  function setBestScore() {
    if (myGameArea.points > bestScore) {
      bestScore = myGameArea.points;
      localStorage.setItem(`bestScore`, myGameArea.points);
    }
  }

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
  const background = new Background("./img/background.jpg");

  class Eater {
    constructor(x, y) {
      this.img = new Image();
      this.img.src = "./img/eater.png";
      this.x = x;
      this.y = y;
      this.speed = 0;
      this.width = 200;
      this.height = 160;
    }

    draw() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      // desenha a borda de colisão
      //ctx.strokeStyle = 'red';
      //ctx.strokeRect(this.left(), this.top(), this.right() - this.left(), this.bottom() - this.top());
    }
    moveLeft() {
      if (this.x > 1) {
        this.x -= 50;
      }
    }
    moveRight() {
      if (this.x < 610) {
        this.x += 50;
      }
    }
    top() {
      return this.y + this.height / 4;
    }
    bottom() {
      return this.y + this.height - 40;
    }
    left() {
      return this.x + 60;
    }
    right() {
      return this.x + this.width - 60;
    }
    checkIfPick(food) {
      return !(
        this.top() > food.bottom() ||
        this.bottom() < food.top() ||
        this.left() > food.right() ||
        this.right() < food.left()
      );
    }
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

  function checkIfPickItem() {
    for (let i = 0; i < myGameArea.items.length; i += 1) {
      if (eater.checkIfPick(myGameArea.items[i])) {
        if (myGameArea.items[i].good) {
          myGameArea.points += 7.5;
          effects[0].play();
          if (myGameArea.points > 50) {
            myGameArea.points += 10;
            effects[0].play();
          } else if (myGameArea.points > 150) {
            myGameArea.points += 12.5;
            effects[0].play();
          }
        } else {
          myGameArea.lives -= 1;
          effects[1].play();
        }
        myGameArea.items.splice(i, 1);
      }
    }
  }

  function checkDownItems() {
    const canvasYLimit = myGameArea.canvas.height;
    for (let i = 0; i < myGameArea.items.length; i += 1) {
      if (
        myGameArea.items[i].good &&
        myGameArea.items[i].bottom() > canvasYLimit
      ) {
        myGameArea.lives -= 1;
        effects[2].play();
        myGameArea.items.splice(i, 1);
      }
    }
  }

  function checkGameOver() {
    if (myGameArea.lives <= 0) {
      myGameArea.stop();
    }
  }

  function updateGameArea() {
    myGameArea.clear();
    background.draw();
    eater.draw();
    updateFood();
    checkIfPickItem();
    myGameArea.score();
    myGameArea.bestScore();
    myGameArea.livesDown();
    checkDownItems();
    checkGameOver();
    setBestScore();
  }

  document.querySelector(".start-button").addEventListener("click", () => {
    hiddenButton();
    showMessage();
  });

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 37) {
      eater.moveLeft();
    } else if (e.keyCode === 39) {
      eater.moveRight();
    }
  });

  const restartGame = document.querySelector('.restart');
  function restart() {
    location.reload();
  }
  restartGame.addEventListener('click', restart);
};
