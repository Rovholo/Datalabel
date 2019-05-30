<?php
    namespace Rovholo\datalabel;
    class rate{
        function rate($rate,$user) {
            $link = mysqli_connect("localhost","user","password","database1");
            if ($link->connect_error) {
                die("connection failed: " . $link->connect_error);
            }
    
            #$user = $_POST['userID'];
            #$rate = $_POST['rate'];
    
            $result = mysqli_query($link,"UPDATE users SET user_rating = '$rate' WHERE users.user_id = '$user'");
    
            $link->close();
            $arr = array();
            while ($row = mysqli_fetch_assoc($result)) 
            {
                #echo json_encode($result);
                array_push($arr, $row);
            }
            echo json_encode($arr);
            return json_encode($arr);
        }
    }

?>
