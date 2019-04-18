<?php
    namespace Rovholo\datalabel;
    class download{
        function request() {
            $servername = "localhost";
            $username = "piykvshj";
            $password = "Differ123*cpanel";
            
            $link = mysqli_connect($servername,$username,$password,"piykvshj_database1");
            
            if ($link->connect_error) {
                die("connection failed: " . $link->connect_error);
            }
            
            $result = mysqli_query($link,"SELECT * FROM images2");
            
            $link->close();
            
            $arr = array();
            while ($row = mysqli_fetch_assoc($result)) {
                array_push($arr, $row);
            }
            echo json_encode($arr);
            
            return $result;
        }
    }
?>
