"use strict";

class DiamondNode {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = 60;
    this.color = "white";
    this.width = this.size
    this.height = this.size
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.size,
      height: this.size
    };
  }

  lineFOfX(x, s, e) {
    let slope = (e.y - s.y) / (e.x - s.x);
    let intercept = slope * -s.x + s.y;
    return slope * x + intercept;
  }

  contains(p) {
    let top = { x: this.x + this.size / 2, y: this.y };
    let bottom = { x: this.x + this.size / 2, y: this.y + this.size };
    let left = { x: this.x, y: this.y + this.size / 2 };
    let right = { x: this.x + this.size, y: this.y + this.size / 2 };

    return (
      p.y > this.lineFOfX(p.x, left, top) &&
      p.y > this.lineFOfX(p.x, top, right) &&
      p.y < this.lineFOfX(p.x, right, bottom) &&
      p.y < this.lineFOfX(p.x, bottom, left)
    );
  }

  translate(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  draw(panel) {
    const poly = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    poly.setAttribute(
      "points",
      this.x +
        this.size / 2 +
        "," +
        this.y +
        " " +
        this.x +
        "," +
        (this.y + this.size / 2) +
        " " +
        (this.x + this.size / 2) +
        "," +
        (this.y + this.size) +
        " " +
        (this.x + this.size) +
        "," +
        (this.y + this.size / 2)
    );
    panel.appendChild(poly);
    poly.setAttribute("fill", "white");
    poly.setAttribute("stroke", "black");
    poly.setAttribute("stroke-width", "1");
  }

  clone() {
    return new DiamondNode();
  }

  setSize(d) {
    this.size = parseFloat(d);
  }

  getType() {
    return "NODE";
  }

  getSize() {
    return size;
  }

  getConnectionPoint(p) {
    let thisCenter = { x: this.x + this.size / 2, y: this.y + this.size / 2 };
    let dx = p.x - thisCenter.x;
    let dy = p.y - thisCenter.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) {
      return p;
    } else {
      return {
        x: thisCenter.x + (dx * (this.size / 2)) / dist,
        y: thisCenter.y + (dy * (this.size / 2)) / dist
      };
    }
  }

  getProperties() {
    let props = ["Size", "text", this.getSize, this.setSize];
    return props;
  }
  removeNode(g, n) {}

  removeEdge(g, e) {}

  getNodeType(){
    return "DIAMONDNODE"
  }

  setScale(n) {
    this.width/n;
    this.height/n;
  }
}


