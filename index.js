
//var res;
function login() {
    //alert("login");
    
    var res;
    var Uname = document.forms["loginform"]["username"].value;
    var pass = document.forms["loginform"]["password"].value;
    var formData = new FormData();
    formData.set('Uname', Uname);
    
    var httpReq = new XMLHttpRequest();
    httpReq.open("POST", "php/login.php", false);
    //httpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpReq.onload = function() {
        //alert(this.responseText);
        res = JSON.parse(this.responseText);
    };
    httpReq.send(formData);
    
    if(res[0].password != pass) {
        document.getElementById("demo").innerHTML = "<p>invalid username or password</p>";
        return false;
    }
    
    alert("login success");
    self.location = "/upload.html";
    return false;
}

function register() {
    //alert("script activated");
    var res;
    var user = document.forms["joinform"]["username"].value;
    var mail = document.forms["joinform"]["email"].value;
    var pass = document.forms["joinform"]["password"].value;
    //var params = "Uname=" + user + "&Umail=" + mail + "&passwd=" + pass;
    var formData = new FormData();
    formData.set('Uname', user);
    formData.set('Umail', mail);
    formData.set('passwd', pass);
    var httpReq = new XMLHttpRequest();
    httpReq.open("POST", "php/register.php", false);
    //httpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpReq.onload = function() {
        res = JSON.parse(this.responseText);
    };
    httpReq.send(formData);
    
    self.location = "/index.html";
    return false;
}

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
 
 var resarr;
 var image = document.createElement('img');
 function download() {

    var httpReq = new XMLHttpRequest();
    httpReq.open("POST", "php/download.php", false);
    //httpReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpReq.onload = function() {
        //res = JSON.parse(this.responseText);
        //alert(this.responseText);
        resarr = JSON.parse(this.responseText);
        //image = document.createElement('img');
        //alert(resarr[0].img_data);
        image.src = resarr[0].img_data;
        document.body.appendChild(image);
    };
    
    httpReq.send("");
    //alert(res);
 }
 
 var index = 0;
 function next() {
    //alert("next");
    if(index < resarr.length){
        index = index + 1;
    }
    else{
        index = 0;
    }
    image.src = resarr[index].img_data;
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
 }