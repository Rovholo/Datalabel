<?php
    namespace Rovholo\datalabel;
    class login{
        function login($username) {
        $link = new mysqli("localhost","piykvshj","Differ123*cpanel","piykvshj_database1");
        if ($link->connect_error) {
            die("connection failed: " . $link->connect_error);
        }
        #$user = $_POST['Uname'];
        $result = mysqli_query($link,"SELECT * FROM users where user_name='$username'");
        $link->close();
        $arr = array();
        while ($row = mysqli_fetch_assoc($result)) 
        {
            array_push($arr, $row);
        }
        return json_encode($arr);
?>
