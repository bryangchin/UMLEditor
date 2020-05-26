"use strict";

class ToolBar {
  constructor(graph) {
    this.graph = graph;
    this.toolbar = document.getElementById("toolbar");
    this.tools = [];
    this.selectedTool = undefined;
    this.offSet = 5;
    this.BUTTON_SIZE = 60;
  }

  addGrabber(selector) {
    const button = document.createElement("button");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", this.BUTTON_SIZE);
    svg.setAttribute("height", this.BUTTON_SIZE);
    selector.draw(svg);
    button.appendChild(svg);
    button.addEventListener("click", () => {
      this.selectedTool = selector;
    });
    this.toolbar.appendChild(button);
  }

  addNode(node) {
    const button = document.createElement("button");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", 60);
    svg.setAttribute("height", 60);
    const oldScale = 1
    let newScale = 0.3
    let scaleChange = newScale - oldScale
    let scale = Math.min(this.BUTTON_SIZE / node.width, this.BUTTON_SIZE / node.length)
    // if (node.constructor.name === 'ObjectNode') {
    //   const ObjectButton = document.createElement("button");
    //   const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    //   rect.setAttribute('width', 30)
    //   rect.setAttribute('height', 30)
    //   rect.setAttribute('stroke-width', 1)
    //   rect.setAttribute('stroke', 'black')
    //   node.setSize(10)
    //   node.draw(rect)
    //   ObjectButton.append(rect);
    //   ObjectButton.addEventListener("click", () => {
    //     this.selectedTool = node;
    //   });
    //   this.toolbar.appendChild(ObjectButton);
    // } else {
    node.draw(svg);
    button.append(svg);
    button.addEventListener("click", () => {
      this.selectedTool = node;
    });
    this.toolbar.appendChild(button);

  }

  addEdge(edge) {
    const button = document.createElement("button");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", 60);
    svg.setAttribute("height", 60);
    const n1 = new CircleNode();
    const n2 = new CircleNode();
    const n3 = new CircleNode();
    if (edge.constructor.name === "HVEdge") {
      edge.drawButton(n1, n2, n3);
      n1.translate(-10, -10);
      n2.translate(50, -20);
      n3.translate(-20, 50);
      edge.draw(svg);
      button.append(svg);
      button.addEventListener("click", () => {
        this.selectedTool = edge;
      });
      this.toolbar.appendChild(button);
    } else if (edge.constructor.name === "VHEdge") {
      edge.drawButton(n1, n2, n3);
      n1.translate(-10, -10);
      n2.translate(50, -20);
      n3.translate(-20, 50);
      edge.draw(svg);
      button.append(svg);
      button.addEventListener("click", () => {
        this.selectedTool = edge;
      });
      this.toolbar.appendChild(button);
    } else {
      n1.translate(5 - this.BUTTON_SIZE, 5 - this.BUTTON_SIZE);
      n2.translate(this.BUTTON_SIZE, this.BUTTON_SIZE);
      edge.connect(n1, n2);
      edge.draw(svg);
      button.append(svg);
      button.addEventListener("click", () => {
        this.selectedTool = edge;
      });
      this.toolbar.appendChild(button);
    }
  }

  getSelected() {
    return this.selectedTool;
  }

  setSelected(tool) {
    this.selectedTool = tool;
  }

  reset() {
    while (this.toolbar.firstChild) {
      this.toolbar.removeChild(this.toolbar.firstChild);
    }
  }
}
