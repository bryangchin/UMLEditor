"use strict";

class ObjectNode {
  constructor() {
    this.name = "Add Text";
    this.children = [];
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
    this.size = this.width * this.height;
    this.color = "white";
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
    return new ObjectNode();
  }

  draw(panel) {
    const rect = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "foreignObject"
    );

    rect.setAttribute("x", this.x);
    rect.setAttribute("y", this.y);
    rect.setAttribute("width", this.width);
    rect.setAttribute("height", this.height);
    rect.setAttribute("fill", this.color);
    rect.setAttribute("stroke-width", "1");
    rect.setAttribute("stroke", "black");

    //const result = this.getProperties();
    const table = document.createElement("TABLE");
    table.id = "objectTable";

    table.setAttribute("x", this.x);
    table.setAttribute("y", this.y);
    table.setAttribute("width", this.width);
    table.setAttribute("height", this.height);
    table.setAttribute("fill", this.color);
    table.setAttribute("stroke-width", "1");
    table.setAttribute("stroke", "black");

    const row = document.createElement("TR");
    const value = document.createElement("TD");
    const content = document.createTextNode(this.name);
    value.appendChild(content);
    row.appendChild(value);
    table.appendChild(row);

    rect.appendChild(table);
    panel.appendChild(rect);
  }

  getType() {
    return "NODE";
  }

  getSize() {
    return this.size;
  }
  setSize(d) {
    this.size = parseFloat(d);
    this.length = parseFloat(d)
    this.width = parseFloat(d)
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

  addChild(childNode) {
    let child = childNode.clone();
    this.children.push(child);
    console.log("child added!!!");
  }

  removeNode(node) {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i] === node) {
      }
    }
  }

  removeEdge(g, e) {}

  getNodeType() {
    return "OBJECTNODE";
  }

  getProperties() {
    return [
      { name: "name", value: this.name },
      { name: "color", value: this.color },
      { name: "size", value: this.size }
    ];
  }
}
