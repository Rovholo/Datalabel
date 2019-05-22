<?php
    $servername = "localhost";
    $username = "piykvshj";
    $password = "Differ123*cpanel";
    
    $labels = $_POST['labels'];
    $name = $_POST['fileName'];
    $type = $_POST['fileType'];
    $data = $_POST['dataUrl'];
    
    $link = new mysqli($servername,$username,$password,"piykvshj_database1");

    if ($link->connect_error) {
        die("connection failed: " . $link->connect_error);
    }
    
    $result = mysqli_query($link,"INSERT INTO label_img (img_name, img_type, img_data,img_labels) VALUES ('$name', '$type', '$data','$labels')");
    $link->close();
        
    echo $labels;
    echo $data;
?>