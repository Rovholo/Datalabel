<?php
    $servername = "localhost";
    $username = "piykvshj";
    $password = "Differ123*cpanel";
    
    $link = new mysqli($servername,$username,$password,"piykvshj_database1");

    if ($link->connect_error) {
        die("connection failed: " . $link->connect_error);
    }
    $user = $_POST['Uname'];
    $mail = $_POST['Umail'];
    $pass = $_POST['passwd'];
    
    #echo "now". $user. "thats ric";
    $result = mysqli_query( $link,"INSERT INTO users(user_name, user_email, user_role, password) VALUES('$user', '$mail', 'master', '$pass')" );
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