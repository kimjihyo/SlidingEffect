import { Point } from './point.js';
import { Dialog } from './dialog.js';
import { ActionBar } from './actionBar.js';

class App {
  constructor() {
    this.actionBar = new ActionBar();
    document.body.appendChild(this.actionBar.getElement());
    this.canvasHeight = document.body.clientHeight - this.actionBar.getElement().clientHeight;

    this.canvas = document.createElement('canvas');
    this.canvas.style.height = `${this.canvasHeight}px`;
    this.canvas.style.backgroundColor = '#3de1f5';

    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.mousePos = new Point();
    this.curItem = null;

    this.items = [];
    this.total = 1;
    for (let i = 0; i < this.total; i++) {
      this.items[i] = new Dialog();
    }

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));

    document.addEventListener('pointerdown', this.onDown.bind(this), false);
    document.addEventListener('pointermove', this.onMove.bind(this), false);
    document.addEventListener('pointerup', this.onUp.bind(this), false);

    this.actionBar.addDialogButton.onclick = () => {
      this.total += 1;
      let dialog = new Dialog();
      this.items.push(dialog);
      dialog.resize(this.stageWidth, this.stageHeight);
    };

    this.actionBar.removeDialogButton.onclick = () => {
      if (this.total > 0) {
        this.items.pop();
        this.total -= 1;
      }
    };
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    //this.stageHeight = document.body.clientHeight;
    this.stageHeight = this.canvasHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    // this.canvas.height = 500 * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowBlur = 6;
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';

    this.ctx.lineWidth = 2;

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].resize(this.stageWidth, this.stageHeight);
      // this.items[i].resize(this.stageWidth, 500);
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].animate(this.ctx);
    }

    if (this.curItem) {
      this.ctx.fillStyle = '#ff4338';
      this.ctx.strokeStyle = '#ff4338';

      this.ctx.beginPath();
      this.ctx.arc(
        this.mousePos.x,
        this.mousePos.y,
        8,
        0,
        Math.PI * 2
      );
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(
        this.curItem.centerPos.x,
        this.curItem.centerPos.y,
        8,
        0,
        Math.PI * 2
      );
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.moveTo(
        this.mousePos.x,
        this.mousePos.y,
      );
      this.ctx.lineTo(this.curItem.centerPos.x, this.curItem.centerPos.y);
      this.ctx.stroke();
    }
  }

  onDown(e) {
    this.mousePos.x = e.clientX - this.canvas.getBoundingClientRect().left;
    this.mousePos.y = e.clientY - this.canvas.getBoundingClientRect().top;
    
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i].down(this.mousePos.clone());
      if (item) {
        this.curItem = item;
        const index = this.items.indexOf(item);
        this.items.push(this.items.splice(index, 1)[0]);
        break;
      }
    }
  }

  onMove(e) {
    this.mousePos.x = e.clientX - this.canvas.getBoundingClientRect().left;
    this.mousePos.y = e.clientY - this.canvas.getBoundingClientRect().top;

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].move(this.mousePos.clone());
    }
  }

  onUp(e) {
    this.curItem = null;

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].up();
    }
  }
}

window.onload = () => {
  new App();
}
 