<?php
    namespace Rovholo\datalabel;
    class view{
        function download($user) {
            $link = mysqli_connect("localhost","user","password","database1");
            if ($link->connect_error) {
                die("connection failed: " . $link->connect_error);
            }
    
            #$user = $_POST['userID'];
            $result = mysqli_query($link,"SELECT * FROM label_img WHERE user_id='$user'");
    
            $link->close();
            #echo "connected successfully <br />";
            #echo json_encode($result);
            $arr = array();
            while ($row = mysqli_fetch_assoc($result)) 
            {
                #echo json_encode($result);
                array_push($arr, $row);
            }
            return json_encode($arr);
        }
    }

?>
