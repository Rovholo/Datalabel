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
        labels = new Array(res.length);
        //qindex = 0;
        rect = new Array(res.length).fill(0);
        
        setlabels();
        
    };
    httpReq.send("");
    userinfo = JSON.parse(document.cookie);
    //alert(userinfo[0].user_id);
    init();
    //alert("canvas");
    show_progress();
 }
 
 function randcolor() {
    var r = Math.floor(256 * Math.random());
    var g = Math.floor(256 * Math.random());
    var b = Math.floor(256 * Math.random());
    return "rgb(" + r + "," + g + "," + b + ")";
}
 
 function show_progress() {
    //alert("progress");
    var formData = new FormData();
   // alert(userinfo);
    formData.set('userID', userinfo.user_id);
    var httpReq = new XMLHttpRequest();
    httpReq.open("POST", "php/view.php", false);
    httpReq.onload = function() {
        //alert("progress3");
        var labeled = JSON.parse(this.responseText);
        var progress = (labeled.length/resarr.length)*100;
        var p = document.getElementById('progress');
        p.style.color = "darkorange";
        if(progress == 100){
            p.innerHTML = "progress: completed";
        }
        else {
            p.innerHTML = "progress: " + progress + "%";
        }
        //alert("progress4");
    };
    httpReq.send(formData);
    //alert("progress2");
 }

 function clearlabels() {
    while (q.lastChild) {
        q.removeChild(q.lastChild);
    }
}

function savelabels() {
    //alert("save");
    var httpReq = new XMLHttpRequest();
    var formData = new FormData();
    formData.set('userID', userinfo.user_id);
    formData.set('imgID', resarr[index].img_id);
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
    //alert("save");
    show_progress();
    //alert("save");
    next();
    //alert("save");
    
}

function setText(l,v) {
    labels[qindex] = [{label:l, value:v},{x:rect[qindex].startX, y:rect[qindex].startY, w:rect[qindex].w,h:rect[qindex].h}];
    //alert(labels[qindex]);
    //alert(v);
    var save = true;
    for(var i = 0; i < labels.length;i++) {
        if(!labels[i] || rect[i].w === undefined) {
            save = false;
            break;
        }
        if(labels[i] && labels[i][1].w ===undefined) {
            labels[i] = [labels[i][0],{x:rect[i].startX, y:rect[i].startY, w:rect[i].w,h:rect[i].h}]
        }
    }
    
    if(save && q.lastChild.type != "button") {
        var b2 = document.createElement("input");
        b2.type = "button";
        b2.value = "save";
        b2.onclick = function(){savelabels()};
        q.append(b2);
    }
    //document.getElementById('doc').innerHTML = v;
}

function labelling(i,e) {
    qindex = i;
    //canvas.addEventListener('mousedown', mouseDown, false);
    //canvas.addEventListener('mouseup', mouseUp, false);
    //canvas.addEventListener('mousemove', mouseMove, false);
    //alert("it woorks");
    //alert(i);
    //e.style.color = "#ff0000";
    //var children = tableFields.children;
    for (var j = 0; j < q.children.length; j++) {
        q.children[j].style.color = "#000000";
    }
    e.style.color = "#00CC50";
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    try {
        draw();
    } catch (e) {
        //do nothing
    }
    
}
 
 function setlabels() {
    //alert("setlabel");
    for(var i = 0; i < res.length; i++) {
        setlabel(i)
    }
     
 }
 
 function setlabel(i) {
    var type = res[i].label_type;
    var e = document.createElement("a");
    e.setAttribute("align", "left");
    e.onclick = function(){labelling(i,e)};
    e.style.cursor = "pointer";
    e.innerHTML = "<br />" + res[i].label_name + "<br />";
    q.appendChild(e);
    if(type === 'textarea') {
        e1 = document.createElement(type);
        e1.oninput = function(){setText(res[i].label_name, this.value)};
        e1.maxLength = "100";
        e1.cols = "25";
        e1.rows = "2";
        q.appendChild(e1);
        e1 = document.createElement("br");
        q.appendChild(e1);
        e1 = document.createElement("br");
        q.appendChild(e1);
    }
    else {
        e1 = document.createElement("input");
        e1.setAttribute("type",type);
        e1.setAttribute("name","option");
        e1.oninput = function(){setText(res[i].label_name, res[i].point1)};
        q.appendChild(e1);
        e1 = document.createElement("a");
        e1.innerHTML = res[i].point1 + "<br />";
        q.appendChild(e1);
                
        e1 = document.createElement("input");
        e1.setAttribute("type",type);
        e1.setAttribute("name","option");
        e1.oninput = function(){setText(res[i].label_name, res[i].point2)};
        q.appendChild(e1);
        e1 = document.createElement("a");
        e1.innerHTML = res[i].point2 + "<br />";
        q.appendChild(e1);
                
        e1 = document.createElement("input");
        e1.setAttribute("type",type);
        e1.setAttribute("name","option");
        e1.oninput = function(){setText(res[i].label_name, res[i].point3)};
        q.appendChild(e1);
        e1 = document.createElement("a");
        e1.innerHTML = res[i].point3 + "<br />";
        q.appendChild(e1);
                
        e1 = document.createElement("input");
        e1.setAttribute("type",type);
        e1.setAttribute("name","option");
        e1.oninput = function(){setText(res[i].label_name, res[i].point4)};
        q.appendChild(e1);
        e1 = document.createElement("a");
        e1.innerHTML = res[i].point4 + "<br />";
        q.appendChild(e1);
                
        e1 = document.createElement("input");
        e1.setAttribute("type",type);
        e1.setAttribute("name","option");
        e1.oninput = function(){setText(res[i].label_name, res[i].point5)};
        q.appendChild(e1);
        e1 = document.createElement("a");
        e1.innerHTML = res[i].point5 + "<br /><br />";
        q.appendChild(e1);
    }
 }
 
 function init() {
    //alert("init");
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    //rect = [];
    //closeEnough = 5;
    dragTL=dragBL=dragTR=dragBR=false;
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);
    //canvas.addEventListener('mouseover', mouseover, false);
    //alert("init");
    colors = ["#FF0000","#00FF00","#0000FF","#FFFF00","00FF00","00FFFF","#FFD700","#191970","#8B4513","#FFA500"];
    
}

function init2() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    labels = new Array(res.length);
    rect = new Array(res.length).fill(0);
    //drag = false;
    //closeEnough = 5;
    dragTL=dragBL=dragTR=dragBR=false;
    qindex = undefined;
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
    clearlabels();
    setlabels();
    
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
    clearlabels();
    setlabels();
    
 }
 
function mouseDown(e) {
    mouseX = e.pageX - this.offsetLeft;
    mouseY = e.pageY - this.offsetTop;
    //doc = document.getElementById("doc").innerHTML = rect[qindex].w;
    // if there isn't a rect yet
    //alert("mousedown " + qindex);
    //var de = document.createElement("a");
    //de.innerHTML ="qindex "+qindex+" " +rect[0].startX + " " + rect[0].startY +" " + rect[1].startX + " " + rect[1].startY +" " + rect[2].startX + " " + rect[2].startY +"<br />";
    //document.getElementById("doc1").appendChild(de);
    
    if(rect[qindex].w === undefined){
        rect[qindex] = { startX:mouseX, startY:mouseY, w:0, h:0 };
        //alert(rect[qindex);
        //rect[qindex].startX = mouseX;
        //rect[qindex].startY = mouseY;
        //rect[qindex].w = rect[qindex].h = 0;
        //var de = document.createElement("a");
        //de.innerHTML = rect[qindex].startX + " " + rect[qindex].startY;
        //document.getElementById("doc1").appendChild(de);
        dragBR = true;
        //return;
    }
    
    // 1. top left
    else if( closeEnough(mouseX, rect[qindex].startX,mouseY, rect[qindex].startY) ) {
        //doc.innerHTML = "inelse1"; 
        //canvas.style.cursor = "nwse-resize";
        dragTL = true;
    }
    // 2. top right
    else if( closeEnough(mouseX, rect[qindex].startX+rect[qindex].w,mouseY, rect[qindex].startY) ) {
        //doc.innerHTML = "inelse2"; 
  	    //canvas.style.cursor = "nesw-resize";
        dragTR = true;
    }
    // 3. bottom left
    else if( closeEnough(mouseX, rect[qindex].startX,mouseY, rect[qindex].startY+rect[qindex].h) ){
        //doc.innerHTML = "inelse3";
        //canvas.style.cursor = "nesw-resize";
        dragBL = true;
    }
    // 4. bottom right
    else if( closeEnough(mouseX, rect[qindex].startX+rect[qindex].w,mouseY, rect[qindex].startY+rect[qindex].h) ){
        //doc.innerHTML = "inelse4";
        //canvas.style.cursor = "nwse-resize";
        dragBR = true;
    }
    else {
        // handle not resizing
        //doc.innerHTML = "not resizing";
    }
    //document.getElementById("doc").innerHTML = rect[qindex].startX + " " + rect[qindex].startY;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();

}

function checkCloseEnough(p1, p2){
  return Math.abs(p1-p2) < 10;
}

function closeEnough(p1,p2,p3,p4) {
    return Math.abs(p1-p2) < 8 && Math.abs(p3-p4) < 8;
}

function mouseover(e) {
    //doc.innerHTML = "mouse over";
    //document.getElementById("doc").innerHTML = mouseX+","+mouseY+" - "+rect[qindex.startX + "," + rect[qindex.startY +" - "+ rect[qindex.w +","+ rect[qindex.h;
    canvas.style.cursor = "move";
    
}

function mouseMove(e) {
    //alert("something");
    //alert(mouseX+","+mouseY+" - "+rect[qindex.startX + "," + rect[qindex.startY +" - "+ rect[qindex.w +","+ rect[qindex.h);
  //document.getElementById("doc").innerHTML = mouseX+","+mouseY+" - "+rect[qindex.startX + "," + rect[qindex.startY +" - "+ rect[qindex.w +","+ rect[qindex.h;
  mouseX = e.pageX - this.offsetLeft;
  mouseY = e.pageY - this.offsetTop;
  
  if(dragTL){
    rect[qindex].w -= mouseX - rect[qindex].startX;
    rect[qindex].h -= mouseY - rect[qindex].startY;
    rect[qindex].startX = mouseX;
    rect[qindex].startY = mouseY;
  } else if(dragTR) {
    rect[qindex].w = mouseX - rect[qindex].startX;
    rect[qindex].h -= mouseY - rect[qindex].startY;
    rect[qindex].startY = mouseY;
  } else if(dragBL) {
    rect[qindex].w -= mouseX - rect[qindex].startX;
    rect[qindex].h = mouseY - rect[qindex].startY;
    rect[qindex].startX = mouseX;  
  } else if(dragBR) {
    rect[qindex].w = mouseX - rect[qindex].startX;
    rect[qindex].h = mouseY - rect[qindex].startY;
  }
  if( dragTL || dragTR ||  dragBL || dragBR ){
     ctx.clearRect(0,0,canvas.width,canvas.height);
     draw();
  }
}

function mouseUp() {
  canvas.style.cursor = "auto";
  dragTL = dragTR = dragBL = dragBR = false;
}

function draw() {
    if(qindex >= colors.length) {
        colors[qindex] = randcolor();
    }
    ctx.strokeStyle = colors[qindex];
    //document.getElementById("doc").innerHTML =qindex+" -> " + mouseX+","+mouseY+" - "+rect[qindex].startX + "," + rect[qindex].startY +" - "+ rect[qindex].w +","+ rect[qindex].h;
    ctx.strokeRect(rect[qindex].startX, rect[qindex].startY, rect[qindex].w, rect[qindex].h);
}