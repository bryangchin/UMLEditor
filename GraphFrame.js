"use strict";

function drawGrabber(x, y) {
  const size = 5;
  const panel = document.getElementById("graphpanel");
  const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  square.setAttribute("x", x - size / 2);
  square.setAttribute("y", y - size / 2);
  square.setAttribute("width", size);
  square.setAttribute("height", size);
  square.setAttribute("fill", "black");
  panel.appendChild(square);
}

document.addEventListener("DOMContentLoaded", function() {
  //let graph = simpleGraph
  const panel = document.getElementById("graphpanel");
  const toolbar = document.getElementById("toolbar");
  //const propertysheet = new PropertySheet()

  //Simple Diagram Editor
  const simpleGraph = new Graph();

  simpleGraph.setNodePrototypes(new CircleNode());
  simpleGraph.setNodePrototypes(new DiamondNode());
  simpleGraph.setEdgePrototypes(new LineEdge());
  simpleGraph.setEdgePrototypes(new DashedLineEdge());
  simpleGraph.setEdgePrototypes(new HVEdge());
  simpleGraph.setEdgePrototypes(new VHEdge());

  const toolBar1 = new ToolBar(simpleGraph);
  const nodes1 = simpleGraph.getNodePrototypes();
  const edges1 = simpleGraph.getEdgePrototypes();

  //Object Diagram Editor
  const objectGraph = new Graph();

  objectGraph.setNodePrototypes(new ObjectNode());
  objectGraph.setNodePrototypes(new FileNode());
  objectGraph.setNodePrototypes(new TextNode());
  objectGraph.setEdgePrototypes(new LineEdge());
  objectGraph.setEdgePrototypes(new DashedLineEdge());

  const toolBar2 = new ToolBar(objectGraph);
  const nodes2 = objectGraph.getNodePrototypes();
  const edges2 = objectGraph.getEdgePrototypes();

  //Set grabber
  const select = simpleGraph.getSelect();

  //Set initial graph editor to Simple Graph
  let graph = simpleGraph;
  let toolBar = toolBar1;
  toolBar.addGrabber(select);
  for (let n of nodes1) {
    toolBar.addNode(n);
  }
  for (let e of edges1) {
    toolBar.addEdge(e);
  }
  let selectedTool = undefined;
  let selected = undefined;
  let dragStartPoint = undefined;
  let dragStartBounds = undefined;

  //Add listener to simple editor button
  let simpleButton = document.getElementById("simpleBtn");
  simpleButton.addEventListener("mousedown", () => {
    graph.nodes = []
    graph.edges = []
    toolBar = toolBar1;
    toolBar.reset();
    toolBar.addGrabber(select);
    for (let n of nodes1) {
      toolBar.addNode(n);
    }
    for (let e of edges1) {
      toolBar.addEdge(e);
    }
    for (let i = 0; i < graph.nodes.length; i++){
      graph.nodes = []
    }
    repaint();
  });

  //Add listener to UML editor button
  let umlButton = document.getElementById("umlBtn");
  umlButton.addEventListener("click", () => {
    this.graph = this.objectGraph;
    toolBar.reset();
    toolBar.addGrabber(select);
    for (let n of nodes2) {
      toolBar.addNode(n);
    }
    for (let e of edges2) {
      toolBar.addEdge(e);
    }
    
    repaint();
  });

  toolbar.addEventListener("click", () => {
    selectedTool = toolBar.getSelected();
    console.log(selectedTool.getType());
  });

  panel.addEventListener("mousedown", event => {
    if (selectedTool.getType() === "NODE") {
      console.log("NODE " + selectedTool.getType());
      const item = selectedTool.clone();
      var rect = panel.getBoundingClientRect();
      item.translate(event.clientX - rect.left, event.clientY - rect.top);
      graph.add(item);

      repaint();
    }
    if (selectedTool.getType() === "EDGE") {
      console.log("EDGE click");
      let mousePoint = mouseLocation(event);
      selected = graph.findNode(mousePoint);
      if (selected !== undefined) {
        dragStartPoint = mousePoint;
      }
    } else {
      let mousePoint = mouseLocation(event);
      selected = graph.findNode(mousePoint);
      //console.log(selected.getType());
      if (selected !== undefined) {
        dragStartPoint = mousePoint;
        dragStartBounds = selected.getBounds();
      }
      repaint();

      //Property Table Initiation
      defaultProperties();
    }

    panel.addEventListener("mousemove", event => {
      if (selectedTool.getType() === "NODE") {
        repaint();
      }
      if (selectedTool.getType() === "EDGE") {
        if (dragStartPoint === undefined) return;
        let mousePoint = mouseLocation(event);
        if (selected !== undefined) {
          paintEdge(dragStartPoint, mousePoint);
        }
      } else {
        if (dragStartPoint === undefined) return;
        let mousePoint = mouseLocation(event);

        if (selected !== undefined) {
          const bounds = selected.getBounds();

          selected.translate(
            dragStartBounds.x - bounds.x + mousePoint.x - dragStartPoint.x,
            dragStartBounds.y - bounds.y + mousePoint.y - dragStartPoint.y
          );
          repaint();
        }
      }
    });
  });

  panel.addEventListener("mouseup", event => {
    if (selectedTool.getType() === "NODE") {
      repaint();
    }
    if (selectedTool.getType() === "EDGE") {
      let edge = selectedTool.clone();
      let mousePoint = mouseLocation(event);
      console.log("EDGE up");
      let connectedNode = graph.findNode(mousePoint);
      if (connectedNode) {
        console.log("here");
        if (graph.connect(dragStartPoint, mousePoint, edge)) {
          dragStartPoint = undefined;
          repaintEdge();
          edge = undefined;
        } else {
          dragStartPoint = undefined;
          edge = undefined;
          repaintEdge();
        }
      }
    } else {
      dragStartPoint = undefined;
      dragStartBounds = undefined;
    }
  });
  //adding textnode to objectnode
  // panel.addEventListener("click", event => {
  //   if (selectedTool.getType() === "NODE") {
  //     if (selectedTool.getNodeType() === "TEXTNODE") {
  //       console.log("AAAAAAA: " + selectedTool.getNodeType());
  //       console.log("AAAAAAA: " + selected.getNodeType());
  //       let clickedPoint = mouseLocation(event);
  //       let parentNode = graph.findNode(clickedPoint);
  //       console.log("BBBBBBB: " + parentNode.getNodeType());
  //       if (parentNode.getNodeType() === "OBJECTNODE") {
  //         parentNode.addChild(selected);
  //         repaint();
  //       }
  //     }
  //   }
  // });

  function mouseLocation(event) {
    var rect = panel.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  function repaintEdge() {
    panel.innerHTML = "";
    graph.draw();
  }

  function paintEdge(dragStartPoint, mousePoint) {
    panel.innerHTML = "";
    const edge = document.createElementNS("http://www.w3.org/2000/svg", "line");
    edge.setAttribute("x1", dragStartPoint.x);
    edge.setAttribute("y1", dragStartPoint.y);
    edge.setAttribute("x2", mousePoint.x);
    edge.setAttribute("y2", mousePoint.y);
    edge.setAttribute("stroke", "black");
    edge.setAttribute("stroke-width", 2);
    panel.appendChild(edge);
    graph.draw();
  }
  function repaint() {
    panel.innerHTML = "";
    graph.draw();
    if (selected !== undefined) {
      const bounds = selected.getBounds();
      drawGrabber(bounds.x, bounds.y);
      drawGrabber(bounds.x + bounds.width, bounds.y);
      drawGrabber(bounds.x, bounds.y + bounds.height);
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height);
    }
  }
  const deleteButton = document.getElementById("deleteBtn");

  deleteButton.addEventListener("click", () => {
    if (selected.getType() === "NODE") {
      graph.removeNode(selected);
    } else if (selected.getType() === "EDGE") {
      graph.removeEdge(selected);
    }
    selected = undefined;
    repaint();
  });

  //PROPERTY SHEET FUNCTIONS

  function defaultProperties() {
    let type = document.getElementById("type");
    let text = document.getElementById("ouptut");
    let color = document.getElementById("color");
    let size = document.getElementById("size");
    if (selected === undefined) {
      type.innerHTML = "Undefined";
      text = "";
      color.value = "#ffffff";
      size.innerHTML = 0;
    } else {
      type.innerHTML = selected.constructor.name;
      size.innerHTML = selected.getSize();
      color.value = colourNameToHex(selected.getColor());
      console.log(selected.constructor.name);
      if (
        selected.constructor.name === "ObjectNode" ||
        selected.constructor.name === "TextNode"   ||
        selected.constructor.name === "FileNode"
      ) {
        setObjectNodeProperties();
      }
    }
  }

  function setObjectNodeProperties() {
    console.log("ACCESSED setObjectNodeProperties()");
    let objNode = selected.clone();
    const form = document.querySelector("form");
    const textarea = document.querySelector("textarea");
    const textListen = new CustomEvent("awesome", {
      bubbles: true,
      detail: { text: () => textarea.value }
    });

    form.addEventListener("awesome", e => objNode.setName(e.detail.text()));
    textarea.addEventListener("input", e => {
      console.log(textListen.detail.text());
      for (let i = 0; i < graph.nodes.length; i++) {
        console.log("Entered FOR LOOP");
        if (graph.nodes[i] === selected) {
          graph.nodes[i].setName(textListen.detail.text());
          repaint();
        }
      }
    });
  }

  function colourNameToHex(colour) {
    var colours = {
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedalmond: "#ffebcd",
      blue: "#0000ff",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      gold: "#ffd700",
      goldenrod: "#daa520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#adff2f",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      "indianred ": "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      lavender: "#e6e6fa",
      lavenderblush: "#fff0f5",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrodyellow: "#fafad2",
      lightgrey: "#d3d3d3",
      lightgreen: "#90ee90",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370d8",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      navy: "#000080",
      oldlace: "#fdf5e6",
      olive: "#808000",
      olivedrab: "#6b8e23",
      orange: "#ffa500",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#d87093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#ff0000",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whitesmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowgreen: "#9acd32"
    };

    if (typeof colours[colour.toLowerCase()] != "undefined")
      return colours[colour.toLowerCase()];

    return false;
  }
});
