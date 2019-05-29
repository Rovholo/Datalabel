<?php
    $servername = "localhost";
    $username = "piykvshj";
    $password = "Differ123*cpanel";
    
    $user = $_POST['userID'];
    $rate = $_POST['rate'];
    
    $link = new mysqli($servername,$username,$password,"piykvshj_database1");

    if ($link->connect_error) {
        die("connection failed: " . $link->connect_error);
    }
    
    $result = mysqli_query($link,"UPDATE users SET user_rating = '$rate' WHERE users.user_id = '$user'");
    
    $link->close();
    $arr = array();
    while ($row = mysqli_fetch_assoc($result)) 
    {
        #echo json_encode($result);
        array_push($arr, $row);
    }
    echo json_encode($arr);

?>