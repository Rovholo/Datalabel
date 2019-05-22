<?php
    $servername = "localhost";
    $username = "piykvshj";
    $password = "Differ123*cpanel";
    
    $link = new mysqli($servername,$username,$password,"piykvshj_database1");

    if ($link->connect_error) {
        die("connection failed: " . $link->connect_error);
    }
    
    $result = mysqli_query($link,"SELECT * FROM labels");
    
    $link->close();
    
    $arr = array();
    while ($row = mysqli_fetch_assoc($result)) 
    {
        #echo json_encode($result);
        array_push($arr, $row);
    }
    echo json_encode($arr);
?>