
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
    
    //alert("login success");
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
