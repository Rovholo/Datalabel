<?php
    $servername = "localhost";
    $username = "piykvshj";
    $password = "Differ123*cpanel";
    
    $link = new mysqli($servername,$username,$password,"piykvshj_database1");

    if ($link->connect_error) {
        die("connection failed: " . $link->connect_error);
    }
    $label = $_POST['label'];
    $type = $_POST['type'];
    if(type === 'textarea') {
        $result = mysqli_query( $link,"INSERT INTO labels(label_name, label_type) VALUES('$label', '$type')" );
    }
    else {
        $point1 = $_POST['point1'];
        $point2 = $_POST['point2'];
        $point3 = $_POST['point3'];
        $point4 = $_POST['point4'];
        $point5 = $_POST['point5'];
        
        $result = mysqli_query( $link,"INSERT INTO labels(label_name, label_type, point1, point2, point3, point4, point5) VALUES('$label', '$type','$point1','$point2','$point3','$point4','$point5')" );
    }
    #echo "now". $user. "thats ric";
    
    $link->close();
    #echo "connected successfully <br />";
    #echo json_encode($result);
    $arr = array();
    while ($row = mysqli_fetch_assoc($result)) 
    {
        #echo json_encode($result);
        array_push($arr, $row);
    }
    echo json_encode($arr);
?>