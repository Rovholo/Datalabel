<?php
    $servername = "localhost";
    $username = "piykvshj";
    $password = "Differ123*cpanel";
    
    
    $user = $_POST['userID'];
    $img = $_POST['imgID'];
    $labels = $_POST['labels'];
    $name = $_POST['fileName'];
    $type = $_POST['fileType'];
    $data = $_POST['dataUrl'];
    
    $link = new mysqli($servername,$username,$password,"piykvshj_database1");

    if ($link->connect_error) {
        die("connection failed: " . $link->connect_error);
    }
    
    $result = mysqli_query($link,"SELECT * FROM label_img where user_id='$user' and img_id='$img'");
    if (mysqli_num_rows($result) > 0) {
        $result = mysqli_query($link,"UPDATE label_img SET img_labels='$labels' WHERE user_id='$user' and img_id='$img'");
    }
    else {
        $result = mysqli_query($link,"INSERT INTO label_img (user_id, img_id, img_name, img_type, img_data,img_labels) VALUES ('$user','$img','$name', '$type', '$data','$labels')");
    }
    $link->close();
        
    //echo $labels;
    //echo $data;
?>