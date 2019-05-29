 function view() {
    
    cookie = JSON.parse(document.cookie);
    
    var formData = new FormData();
    formData.set('userID', cookie.user_id);
    var httpReq = new XMLHttpRequest();
    httpReq.open("POST", "php/view.php", false);
    //httpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpReq.onload = function() {
        //alert(this.responseText);
        resarr = JSON.parse(this.responseText);
        if(resarr.length === 0) {
            alert("This user has not labelled anything!");
            self.location = "/responses.html";
            return false;
        }
        image = document.getElementById('img');
        image.src = resarr[0].img_data;
        index = 0;
        ques = document.getElementById("questions");
        
    };
    httpReq.send(formData);
    
    init();
    
    document.getElementById('rater').value = 0;
    showLabels();
    show_progress();
 }
 
 function show_progress() {
    var formData = new FormData();
    var httpReq = new XMLHttpRequest();
    httpReq.open("POST", "php/download.php", false);
    httpReq.onload = function() {
        
        var img = JSON.parse(this.responseText);
        var progress = (resarr.length/img.length)*100;
        
        var e = document.createElement("a");
        e.style.color = "saddlebrown";
        
        if(progress == 100){
            e.innerHTML = cookie.user_name + "_" + cookie.user_id + " &nbsp &nbsp progress: " + "completed";
        }
        else {
            e.innerHTML = cookie.user_name + "_" + cookie.user_id + " &nbsp &nbsp progress: "  + progress + "%";
        }
        
        document.getElementById("userinfo").appendChild(e);
    };
    httpReq.send("");
 }
 
 function rate() {
    
    var formData = new FormData();
    formData.set('userID', cookie.user_id);
    formData.set('rate', document.getElementById('rater').value);
    var httpReq = new XMLHttpRequest();
    httpReq.open("POST", "php/rate.php", false);
    httpReq.onload = function() {
        
    };
    httpReq.send(formData);
 }
 
 function randcolor() {
    var r = Math.floor(256 * Math.random());
    var g = Math.floor(256 * Math.random());
    var b = Math.floor(256 * Math.random());
    return "rgb(" + r + "," + g + "," + b + ")";
}
 
 function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    colors = ["#FF0000","#00FF00","#0000FF","#FFFF00","00FF00","00FFFF","#FFD700","#191970","#8B4513","#FFA500"];
}

function showLabels() {
    var tmp = JSON.parse(resarr[index].img_labels);
    for(var i = 0; i < tmp.length; i++) {
        if(i >= colors.length) {
            colors[i] = randcolor();
        }
        var e = document.createElement("a");
        e.setAttribute("align", "left");
        e.style.color = colors[i];
        e.innerHTML = "<br /> " + tmp[i][0].label + ":<br />  - " + tmp[i][0].value+"<br />";
        
        ques.appendChild(e);
        ctx.strokeStyle = colors[i];
        ctx.strokeRect(parseInt(tmp[i][1].x), parseInt(tmp[i][1].y), parseInt(tmp[i][1].w), parseInt(tmp[i][1].h));
    }
}

 function next() {
    alert("next");
    
    if(index < resarr.length-1){
        index = index + 1;
    }
    else{
        index = 0;
    }
    image.src = resarr[index].img_data;
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    clearlabels();
    showLabels();
 }
 
 function prev() {
    alert("prev");
    
    if(index === 0){
        index = resarr.length - 1;
    }
    else{
        index = index - 1;
    }
    image.src = resarr[index].img_data;
    //showLabels();
    //init2();
    //qindex = 0;
    //labels = new Array(res.length);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    clearlabels();
    showLabels();
    
 }
 function clearlabels() {
    while (ques.lastChild) {
        ques.removeChild(ques.lastChild);
    }
}
