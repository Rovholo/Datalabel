function upload() {
    var file = document.getElementById('fileupload');

    for(var i = 0; i < file.files.length; i++) {
        send(i);
    }
    
    function send(i){
        
        var httpReq = new XMLHttpRequest();
        var formData = new FormData();
        formData.set('file', file.files[i]);
        httpReq.open("POST", "php/upload.php", false);
        //httpReq.onload = function() {
            //res = JSON.parse(this.responseText);
            //alert(this.responseText);
            //var resp = JSON.parse(this.response);
            //var image = document.createElement('img');
            //image.src = resp.dataUrl;
            //document.body.appendChild(image);
        //};
        
        httpReq.send(formData);
    }
}

function questions() {
    form = document.getElementById("myForm");
    check = document.getElementById("checkBox");
    text = document.getElementById("textArea");
    radio = document.getElementById("radio");
    document.getElementById("label").value = "";
    point = document.getElementById("txt");
    addlabel = document.getElementById("Addlabel");
	submit1 = document.getElementById("btn_submit");
    
    text.checked = false;
    closeForm();
}

function TypeDisplay() {
    //alert("hi yall 2");
	document.getElementById("container").style.display = "block";
	//alert("updated");
}

function add(){
    //alert("add!!!!!");
    if(count < 4){
        count++;
        points.push(point.value);
        point.value = "";
        //alert("count");
    }
    else {
        //document.getElementById("add").disabled = true;
        
        addlabel.style.display = "none";
	    submit1.style.display = "block";
        points.push(point.value);
        if(radio.checked) box = "radio";
        else box = "checkbox";
        closeForm();
        //alert("successfully added points!!!");
        //count = 0;
    }
}

function submitContent() {
    //alert("something!!!");
    var httpReq = new XMLHttpRequest();
    var formData = new FormData();
    formData.set('label', document.getElementById("label").value);
    
    if(text.checked) {
        formData.set('type', 'textarea');
        //alert('textarea')
    }
    else {
        formData.set('type', box);
        formData.set('point1', points[0]);
        formData.set('point2', points[1]);
        formData.set('point3', points[2]);
        formData.set('point4', points[3]);
        formData.set('point5', points[4]);
    }
    
    httpReq.open("POST", "php/labels.php", false);
    httpReq.send(formData);
    //alert("successfully updated");
    //self.location.reload();
}

function formDisplay() {
	
	points = [];
	if(text.checked){
	    addlabel.style.display = "none";
	    submit1.style.display = "block";
	    count = 0;
	}
	else {
	    addlabel.style.display = "block";
	    submit1.style.display = "none";
	}
    if(check.checked || radio.checked) {
	    form.style.display = "block";
	    //document.getElementById("add").disabled = false;
    }
	else {
	    closeForm();
	}
}

function closeForm() {
	form.style.display = "none";
	point.value = "";
	check.checked = false;
    radio.checked = false;
	count = 0;
}
