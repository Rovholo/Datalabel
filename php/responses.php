<?php
    $servername = "localhost";
    $username = "piykvshj";
    $password = "Differ123*cpanel";


    $link = new mysqli($servername,$username,$password,"piykvshj_database1");
    if ($link->connect_error) {
        die("connection failed: " . $link->connect_error);
    }

    $result = mysqli_query($link,"SELECT * FROM users where user_role != 'manager'");
    $arr = array();
    if ($result->num_rows > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($arr, $row);
        }
    } else {
        array_push($arr, "0 results");
    }
    echo json_encode($arr);

$conn->close();

?>
