"use strict";

class CircleNode {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = 40;
    this.color = "white";
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.size,
      height: this.size
    };
  }

  contains(p) {
    return (
      (this.x + this.size / 2 - p.x) ** 2 +
        (this.y + this.size / 2 - p.y) ** 2 <=
      this.size ** 2 / 4
    );
  }

  translate(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  draw(panel) {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", this.x + this.size / 2);
    circle.setAttribute("cy", this.y + this.size / 2);
    circle.setAttribute("r", this.size / 2);
    circle.setAttribute("stroke", "black");
    circle.setAttribute("fill", this.color);
    panel.appendChild(circle);
  }

  clone() {
    return new CircleNode();
  }

  setSize(d) {
    this.size = parseFloat(d);
  }

  getType() {
    return "NODE";
  }

  getSize() {
    return this.size;
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
  removeNode( n) {}

  removeEdge(g, e) {}

  getNodeType(){
    return "CIRCLENODE"
  }
  setScale(n) {
    this.width/n;
    this.height/n;
  }
}




