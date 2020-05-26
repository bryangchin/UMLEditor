'use strict'

class Selector {
    constructor () {
        this.x = 0
        this.y = 0
    }

    drawGrab(x, y, panel)  {
        const size = 5;
        const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        square.setAttribute("x", x);
        square.setAttribute("y", y);
        square.setAttribute("width", size);
        square.setAttribute("height", size);
        square.setAttribute("fill", "black");
        panel.appendChild(square);
    }

    translate(dx, dy) {
        this.x += dx
        this.y += dy
    }

    clone() {
        let clone = new Selector()
        clone.this.translate(x,y)
        return clone
    }

    getType() {
        return "SELECT";
      }

    draw(panel){
        let x = this.x
        let y = this.y
        this.drawGrab(x+5,y+5,panel)
        this.drawGrab(x + 30,y+5,panel)
        this.drawGrab(x+5,y + 30,panel)
        this.drawGrab(x + 30,y + 30,panel)
    }

}
