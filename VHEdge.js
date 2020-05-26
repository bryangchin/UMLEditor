"use strict";

class VHEdge {
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
    return new VHEdge();
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
    const hEdge = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    const vEdge = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    let startPoint = this.start.getConnectionPoint(
      this.center(this.end.getBounds())
    );
    let endPoint = this.end.getConnectionPoint(
      this.center(this.start.getBounds())
    );
    let jointPoint = { x: startPoint.x, y: endPoint.y };
    vEdge.setAttribute("x1", jointPoint.x);
    vEdge.setAttribute("y1", jointPoint.y);
    vEdge.setAttribute("x2", endPoint.x);
    vEdge.setAttribute("y2", endPoint.y);
    vEdge.setAttribute("stroke", "black");
    vEdge.setAttribute("stroke-width", 1);

    hEdge.setAttribute("x1", startPoint.x);
    hEdge.setAttribute("y1", startPoint.y);
    hEdge.setAttribute("x2", jointPoint.x);
    hEdge.setAttribute("y2", jointPoint.y);
    hEdge.setAttribute("stroke", "black");
    hEdge.setAttribute("stroke-width", 1);

    panel.appendChild(hEdge);
    panel.appendChild(vEdge);
  }
  drawButton(n1, n2, n3) {
    this.connect(n1,n2)
    this.connect(n2,n3)
  }
}
