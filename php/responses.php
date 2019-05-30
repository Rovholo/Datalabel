<?php
    namespace Rovholo\datalabel;
    class responses{
        function response() {
            $link = mysqli_connect("localhost","user","password","database1");
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
        }
    }

?>
