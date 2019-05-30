<?php
    namespace Rovholo\datalabel;
    class labeling{
        function labels() {
            $link = mysqli_connect("localhost","user","password","database1");
            if ($link->connect_error) {
                die("connection failed: " . $link->connect_error);
            }
    
            $result = mysqli_query($link,"SELECT * FROM labels");
    
            $link->close();
    
            $arr = array();
            while ($row = mysqli_fetch_assoc($result)) 
            {
                array_push($arr, $row);
            }
            echo json_encode($arr);
            return json_encode($arr);
        }
    }
?>
