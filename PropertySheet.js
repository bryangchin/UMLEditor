'use strict'

class PropertySheet {
    constructor(graph) {
        this.propertysheet = document.getElementById("propertysheet")
        this.graph = graph
        this.properties = [];
        if (object !== undefined) properties = object.getProperties();
    }
    createTable() {
        var table = document.createElement('TABLE');
        table.border = '1';
        var columnCount = 2;
        for (var i = 0; i < this.properties.length; i+=4) {
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(-1);
            console.log(this.properties[0])
            var name = document.createTextNode(this.properties[i]);
            cell1.appendChild(name);
            var cell2 = row.insertCell(-1);
            var editor = document.createElement('BUTTON');
            editor.innerHTML = this.properties[i+1];
            if(this.properties[i+1] === 'text')
            {
                editor = document.createElement('INPUT');
                editor.setAttribute('type', 'text');
                editor.style.width = '200px';
                editor.defaultValue = properties[i+2]();
            }
            else if(this.properties[i+1] === 'text_box')
            {
                editor = document.createElement('TEXTAREA');
                editor.defaultValue = 'testing';
            }
            else if(this.properties[i+1] === 'boolean')
            {
                editor=document.createElement('select');
                var op1 = new Option();
                op1.value = 1;
                op1.text = 'True';
                editor.options.add(op1); 
                var op2 = new Option();
                op2.value = 1;
                op2.text = 'false';
                editor.options.add(op2); 
            }
            
            editor.id = 'edit' + (i/4);
            cell2.appendChild(editor);
             
        }
        var propertySheet = document.getElementById('propertysheet');
        this.propertysheet.innerHTML = '';
        this.propertysheet.appendChild(table);
        if(this.object !== undefined) {
            var accept = document.createElement('BUTTON');
            accept.innerHTML = 'Submit';
            accept.onclick = function () {
                propertyEditor(object);
            } 
            this.propertysheet.appendChild(accept); 
        }
    }

    addObject(obj) {
        this.properties.push(obj)
        console.log(this.properties[0])
    }

    propertyEditor(obj){
		var prop = obj.getProperties()
		for (var i = 0; i < (prop.length/4); i++) {
			prop[i*4 + 3](document.getElementById('edit' + i).value);
		}
		
	}
}