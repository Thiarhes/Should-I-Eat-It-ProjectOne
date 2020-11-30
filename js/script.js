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

  function updateGameArea() {
    myGameArea.clear();
    background.draw();
    ctx.drawImage(mouthTest, 300, 300, 100, 50);
  }
  const mouthTest = new Image();
  mouthTest.src = "../img/mouth.jpg";
};
