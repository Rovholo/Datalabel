 function download() {

    var httpReq = new XMLHttpRequest();
    httpReq.open("POST", "php/download.php", false);
    //httpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpReq.onload = function() {
        //res = JSON.parse(this.responseText);
        //alert(this.responseText);
        //document.getElementById('doc').innerHTML = this.responseText;
        resarr = JSON.parse(this.responseText);
        image = document.getElementById('img');
        //alert(resarr[0].img_data);
        image.src = resarr[0].img_data;
        index = 0;
        //document.getElementById('cover').appendChild(image);
    };
    httpReq.send("");
    //cover = document.getElementById('cover');
    //cover.style.display = "inline-block";
    //div = document.createElement('div');
    //div.className = "questions";
    //cover.appendChild(div);
    //alert("canvas");
    httpReq = new XMLHttpRequest();
    httpReq.open("POST", "php/labeling.php", false);
    //httpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpReq.onload = function() {
        res = JSON.parse(this.responseText);
        //document.getElementById('doc').innerHTML = this.responseText;
        q = document.getElementById('questions');
        //document.getElementById('doc').innerHTML = q.nodeName;
        labels = new Array(res.length)
        qindex = 0;
        b = document.createElement("input");
        b.type = "button";
        b.value = "back";
        b.onclick = function(){prev_label()};
        //document.getElementById('doc').innerHTML = b.nodeName
        q.append(b);
        b1 = document.createElement("input");
        b1.type = "button";
        b1.value = "next";
        b1.onclick = function(){next_label()};
        q.append(b1);
        
        
        b2 = document.createElement("input");
        b2.type = "button";
        b2.value = "save";
        b2.onclick = function(){savelabels()};
        b2.style.display = "none";
        q.append(b2);
        //for(var i = 0; i < res.length; i++) {
                setlabel(0);
            
        //}
    };
    httpReq.send("");
    
    init();
    //alert("canvas");
 }
 function next_label() {
    if(qindex < res.length-1){
        qindex = qindex + 1;
    }
    else{
        qindex = 0;
    }
    init2();
    clearlabels();
    setlabel(qindex);
    
 }
 function prev_label() {
     if(qindex === 0){
        qindex = res.length - 1;
    }
    else{
        qindex = qindex - 1;
    }
    init2();
    clearlabels();
    setlabel(qindex);
    
 }
 
 
 function clearlabels() {
    while (q.lastChild && q.lastChild.type != "button") {
        q.removeChild(q.lastChild);
    }
}

function savelabels() {
    //alert("save");
    var httpReq = new XMLHttpRequest();
    var formData = new FormData();
    formData.set('fileName', resarr[index].img_name);
    formData.set('fileType', resarr[index].img_type);
    formData.set('dataUrl', resarr[index].img_data);
    formData.set('labels', JSON.stringify(labels));
    httpReq.open("POST", "php/output.php", false);
    httpReq.onload = function() {
        //res = JSON.parse(this.responseText);
        //alert(this.responseText);
        //var resp = JSON.parse(this.response);
        //var image = document.createElement('img');
        //image.src = resp.dataUrl;
        //document.body.appendChild(image);
    };
        
    httpReq.send(formData);
    b.style.display = "inline-block";
    b1.style.display = "inline-block";
    b2.style.display = "none";
    next();
    
}

function setText(v) {
    //alert("label[qindex]");
    //if(labels[qindex]) {
    //alert(labels[qindex]);
    //}
    labels[qindex] = [v,{x:rect.startX, y:rect.startY, w:rect.w,h:rect.h}];
    //alert(v);
    var save = true;
    for(var i = 0; i < labels.length;i++){
        if(!labels[i]) {
            save = false;
            break;
        }
    }
    if(save) {
        b.style.display = "none";
        b1.style.display = "none";
        b2.style.display = "inline-block";
    }
    //document.getElementById('doc').innerHTML = v;
}
 
 function setlabel(i) {
     //alert("setlabel");
     var type = res[i].label_type;
            var e = document.createElement("a");
            e.setAttribute("align", "left");
            e.innerHTML = "<br />" + res[i].label_name + "<br />";
            q.appendChild(e);
            if(type === 'textarea') {
                e = document.createElement(type);
                e.oninput = function(){setText(this.value)};
                e.maxLength = "100";
                e.cols = "25";
                e.rows = "2";
                q.appendChild(e);
                e = document.createElement("br");
                q.appendChild(e);
                e = document.createElement("br");
                q.appendChild(e);
            }
            else {
                e = document.createElement("input");
                e.setAttribute("type",type);
                e.setAttribute("name","option");
                e.oninput = function(){setText(res[qindex].point1)};
                q.appendChild(e);
                e = document.createElement("a");
                e.innerHTML = res[i].point1 + "<br />";
                q.appendChild(e);
                
                e = document.createElement("input");
                e.setAttribute("type",type);
                e.setAttribute("name","option");
                e.oninput = function(){setText(res[qindex].point2)};
                q.appendChild(e);
                e = document.createElement("a");
                e.innerHTML = res[i].point2 + "<br />";
                q.appendChild(e);
                
                e = document.createElement("input");
                e.setAttribute("type",type);
                e.setAttribute("name","option");
                e.oninput = function(){setText(res[qindex].point3)};
                q.appendChild(e);
                e = document.createElement("a");
                e.innerHTML = res[i].point3 + "<br />";
                q.appendChild(e);
                
                e = document.createElement("input");
                e.setAttribute("type",type);
                e.setAttribute("name","option");
                e.oninput = function(){setText(res[qindex].point4)};
                q.appendChild(e);
                e = document.createElement("a");
                e.innerHTML = res[i].point4 + "<br />";
                q.appendChild(e);
                
                e = document.createElement("input");
                e.setAttribute("type",type);
                e.setAttribute("name","option");
                e.oninput = function(){setText(res[qindex].point5)};
                q.appendChild(e);
                e = document.createElement("a");
                e.innerHTML = res[i].point5 + "<br /><br />";
                q.appendChild(e);
            }
 }
 
 function init() {
    //alert("init");
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    rect = {};
    drag = false;
    closeEnough = 10;
    dragTL=dragBL=dragTR=dragBR=false;
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);
    //canvas.addEventListener('mouseover', mouseover, false);
    //alert("init");
    
    
}

function init2() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    rect = {};
    drag = false;
    closeEnough = 10;
    dragTL=dragBL=dragTR=dragBR=false;
    //canvas.addEventListener('mousedown', mouseDown, false);
    //canvas.addEventListener('mouseup', mouseUp, false);
    //canvas.addEventListener('mousemove', mouseMove, false);
    
}

 
 
 function next() {
    //alert("next");
    
    if(index < resarr.length-1){
        index = index + 1;
    }
    else{
        index = 0;
    }
    image.src = resarr[index].img_data;
    init2();
    qindex = 0;
    labels = new Array(res.length);
    clearlabels();
    setlabel(qindex);
    
 }
 
 function prev() {
    //alert("prev");
    
    if(index === 0){
        index = resarr.length - 1;
    }
    else{
        index = index - 1;
    }
    image.src = resarr[index].img_data;
    init2();
    qindex = 0;
    labels = new Array(res.length);
    clearlabels();
    setlabel(qindex);
    
 }
 
function mouseDown(e) {
    mouseX = e.pageX - this.offsetLeft;
    mouseY = e.pageY - this.offsetTop;
    //doc = document.getElementById("doc");
    // if there isn't a rect yet
    //alert("mousedown");
    if(rect.w === undefined){
        rect.startX = mouseY;
        rect.startY = mouseX;
        document.getElementById("doc").innerHTML = rect.startX + " " + rect.startY;
        dragBR = true;
    }
    // 1. top left
    if( checkCloseEnough(mouseX, rect.startX) && checkCloseEnough(mouseY, rect.startY) ){
        //doc.innerHTML = "inelse1"; 
        canvas.style.cursor = "nwse-resize";
        dragTL = true;
    }
    // 2. top right
    else if( checkCloseEnough(mouseX, rect.startX+rect.w) && checkCloseEnough(mouseY, rect.startY) ){
        //doc.innerHTML = "inelse2"; 
  	    canvas.style.cursor = "nesw-resize";
        dragTR = true;
    }
    // 3. bottom left
    else if( checkCloseEnough(mouseX, rect.startX) && checkCloseEnough(mouseY, rect.startY+rect.h) ){
        //doc.innerHTML = "inelse3";
        canvas.style.cursor = "nesw-resize";
        dragBL = true;
    }
    // 4. bottom right
    else if( checkCloseEnough(mouseX, rect.startX+rect.w) && checkCloseEnough(mouseY, rect.startY+rect.h) ){
        //doc.innerHTML = "inelse4";
        canvas.style.cursor = "nwse-resize";
        dragBR = true;
    }
    else {
        // handle not resizing
        //doc.innerHTML = "not resizing";
    }
    document.getElementById("doc").innerHTML = rect.startX + " " + rect.startY;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
    
    //ctx.strokeRect(10, 10, 50, 50);

}

function checkCloseEnough(p1, p2){
  return Math.abs(p1-p2) < closeEnough;
}

function mouseover(e) {
    //doc.innerHTML = "mouse over";
    canvas.style.cursor = "move";
    
}

function mouseMove(e) {
  mouseX = e.pageX - this.offsetLeft;
  mouseY = e.pageY - this.offsetTop;
  if(dragTL){
    rect.w += rect.startX-mouseX;
    rect.h += rect.startY-mouseY;
    rect.startX = mouseX;
    rect.startY = mouseY;
  } else if(dragTR) {
    rect.w += rect.startX-mouseX;
    rect.h += rect.startY-mouseY;
    rect.startY = mouseY;
  } else if(dragBL) {
    rect.w += rect.startX-mouseX;
    rect.h += rect.startY-mouseY;
    rect.startX = mouseX;  
  } else if(dragBR) {
    rect.w += rect.startX-mouseX;
    rect.h += rect.startY-mouseY;
  }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
}

function mouseUp() {
  canvas.style.cursor = "auto";
  dragTL = dragTR = dragBL = dragBR = false;
}

function draw() {
  ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
}