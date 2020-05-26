"use strict";

class TextNode {
  constructor() {
    this.text = "name = ";
    this.name = this.text + ""
    this.x = 0;
    this.y = 0;
    this.size = 10;
    this.width = 80;
    this.methods = "";
    this.height = 25;
    this.color = 'black'
  }
  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  getColor() {
    return this.color
  }

  setColor(newColor) {
    this.color = newColor
  }

  getType() {
    return "NODE";
  }

  contains(p) {
    return (
      p.x > this.x &&
      p.x < this.x + this.width &&
      p.y > this.y &&
      p.y < this.y + this.height
    );
  }

  translate(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  getSize(d) {
    this.size = parseFloat(d);
  }

  clone() {
    return new TextNode();
  }

  draw(panel) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", this.x);
    rect.setAttribute("y", this.y);
    rect.setAttribute("width", this.width);
    rect.setAttribute("height", this.height);
    rect.setAttribute("fill", "rgba(225,225,225,0.1)");
    panel.appendChild(rect);

    const body = document.createElementNS("http://www.w3.org/2000/svg", "text");
    panel.appendChild(body);
    let maxWidth = body.getBoundingClientRect().width;

    let rows = this.name.split(/\n|\r/);
    for (let i = 0; i < rows.length; i++) {
      let row = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      row.setAttribute("x", this.x + 10 + this.width / 4);
      row.setAttribute("y", this.y + 20 + i * 18);
      row.setAttribute("fill", "black");
      row.setAttribute("font-size", "16px");
      row.setAttribute("text-anchor", "middle");
      row.innerHTML = rows[i];
      body.appendChild(row);
      maxWidth = Math.max(maxWidth, row.getBoundingClientRect().width);
    }

    if (Math.abs(maxWidth + 20 - this.width) > 5) {
      //if width is not matching the text resize
      this.width = maxWidth + 20;
      panel.removeChild(body);
      panel.removeChild(rect);
      this.draw(panel);
    }
  }

  getConnectionPoint(p) {
    let dx = p.x - this.x;
    let dy = p.y - this.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        return {
          x: this.x + this.width,
          y: this.y + this.height / 2
        };
      } else {
        return {
          x: this.x,
          y: this.y + this.height / 2
        };
      }
    } else {
      if (dy < 0) {
        return {
          x: this.x + this.width / 2,
          y: this.y
        };
      } else {
        return {
          x: this.x + this.width / 2,
          y: this.y + this.height
        };
      }
    }
  }

  setName(newName) {
    this.name = this.text + newName;
  }

  getName() {
    return {
      name: this.name
    };
  }

  removeNode(g, n) {}

  removeEdge(g, e) {}

  getNodeType() {
    return "TEXTNODE";
  }

  setScale(n) {
    this.width/n;
    this.height/n;
  }
}
