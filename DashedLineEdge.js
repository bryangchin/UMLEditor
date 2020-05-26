"use strict";

class DashedLineEdge {
  constructor() {
    this.start = undefined;
    this.end = undefined;
  }

  center(rect) {
    return { x: rect.x + rect.width / 2, y: rect.y + rect.width / 2 };
  }

  connect(n1, n2) {
    this.start = n1;
    this.end = n2;
  }
  clone() {
    return new DashedLineEdge();
  }

  getStart() {
    return this.start;
  }

  getEnd() {
    return this.end;
  }

  getType() {
    return "EDGE";
  }

  draw(panel) {
    const edge = document.createElementNS("http://www.w3.org/2000/svg", "line");
    let startPoint = this.start.getConnectionPoint(
      this.center(this.end.getBounds())
    );
    let endPoint = this.end.getConnectionPoint(
      this.center(this.start.getBounds())
    );
    edge.setAttribute("x1", startPoint.x);
    edge.setAttribute("y1", startPoint.y);
    edge.setAttribute("x2", endPoint.x);
    edge.setAttribute("y2", endPoint.y);
    edge.setAttribute("stroke", "black");
    edge.setAttribute("stroke-width", 1);
    edge.setAttribute("stroke-dasharray", "5, 5");
    panel.appendChild(edge);
  }
}
