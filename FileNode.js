"use strict";

class FileNode {
  constructor() {
    this.name = "File";
    this.children = [];
    this.x = 0;
    this.y = 0;
    this.width = 80;
    this.height = 60;
    this.size = this.width * this.height;
    this.color = "yellow";
    this.methods = "";
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  clone() {
    return new FileNode();
  }

  draw(panel) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", this.x);
    rect.setAttribute("y", this.y);
    rect.setAttribute("width", this.width);
    rect.setAttribute("height", this.height);
    rect.setAttribute("fill", this.color);
    rect.setAttribute("stroke-width", "1");
    rect.setAttribute("stroke", "black");
    panel.appendChild(rect);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", this.x + this.width / 2);
    text.setAttribute("y", this.y + 20);
    text.setAttribute("fill", "black");
    text.setAttribute("font-size", "15px");
    text.setAttribute("text-anchor", "middle");
    text.innerHTML = this.name;
    panel.appendChild(text);
    let maxWidth = text.getBoundingClientRect().width;

    const body = document.createElementNS("http://www.w3.org/2000/svg", "text");
    panel.appendChild(body);
  }
  getType() {
    return "NODE";
  }

  getSize() {
    return this.size;
  }
  setSize(d) {
    this.size = parseFloat(d);
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

  contains(p) {
    return (
      p.x > this.x &&
      p.x < this.x + this.width &&
      p.y > this.y &&
      p.y < this.y + this.height
    );
  }

  setName(newName) {
    this.name = newName;
  }

  getName() {
    return {
      name: this.name
    };
  }

  setColor(color) {
    this.color = color;
  }
  getColor() {
    return this.color;
  }

  translate(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  getProperties() {
    let props = ["Size", "text", this.getSize, this.setSize];
    return props;
  }
  removeEdge(g, e) {}
  removeNode(g, n) {}
}
