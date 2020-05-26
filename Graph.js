"use strict";

class Graph {
  constructor() {
    this.nodes = [];
    this.edges = [];
    this.pNode = [];
    this.pEdge = [];
    this.select = new Selector();
  }

  drawGrabber(x, y) {
    const size = 5;
    const panel = document.getElementById("graphpanel");
    const square = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    square.setAttribute("x", x - size / 2);
    square.setAttribute("y", y - size / 2);
    square.setAttribute("width", size);
    square.setAttribute("height", size);
    square.setAttribute("fill", "black");
    panel.appendChild(square);
  }

  add(node) {
    this.nodes.push(node);
  }

  setSelect(s) {
    this.select = s;
  }

  findNode(point) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i];
      if (n.contains(point)) return n;
    }
    return undefined;
  }

  draw() {
    const panel = document.getElementById("graphpanel");
    for (const n of this.nodes) {
      n.draw(panel);
    }
    for (const e of this.edges) {
      e.draw(panel);
    }
  }

  getBounds() {
    let r = null;
    for (let i = 0; i < this.nodes.length; i++) {
      let n = this.nodes[i];
      b = n.getBounds();
      if (r === null) r = b;
      else r.push(b);
    }
    for (let i = 0; i < this.edges.length; i++) r.push(e.getBounds());
    return r === null
      ? document.createElementNS("http://www.w3.org/2000/svg", "rect")
      : r;
  }

  getNodes() {
    return this.nodes;
  }

  getEdges() {
    return this.edges;
  }

  getSelect() {
    return this.select;
  }

  setNodePrototypes(n) {
    this.pNode.push(n);
  }

  getNodePrototypes() {
    return this.pNode;
  }

  setEdgePrototypes(n) {
    this.pEdge.push(n);
  }

  getEdgePrototypes() {
    return this.pEdge;
  }

  connect(point1, point2, edge) {
    let n1 = this.findNode(point1);
    let n2 = this.findNode(point2);
    if (n1 !== null && n2 !== null) {
      console.log(n1.getBounds().x);
      console.log(n2.getBounds().x);
      edge.connect(n1, n2);
      this.edges.push(edge);
      return true;
    }
    return false;
  }

  removeNode(node) {
    for (let n of this.nodes) {
      n.removeNode(this, node);
    }
    for (let e of this.edges) {
      if (e.getStart() === node || e.getEnd() === node) this.removeEdge(e);
    }
    let index = this.nodes.indexOf(node);
    this.nodes.splice(index, 1);
  }

  removeEdge(e) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      let n = this.nodes[i];
      n.removeEdge(this, e);
    }
    this.edges.splice(this.edges.indexOf(e), 1);
  }
}
