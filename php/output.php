<?php
    namespace Rovholo\datalabel;
    class output{
        function upload($user,$img,$labels,$name,$type,$data) {
            $link = mysqli_connect("localhost","user","password","database1");
            if ($link->connect_error) {
                die("connection failed: " . $link->connect_error);
            }
            $result = mysqli_query($link,"SELECT * FROM label_img where user_id='$user' and img_id='$img'");
            if (mysqli_num_rows($result) > 0) {
                $result = mysqli_query($link,"UPDATE label_img SET img_labels='$labels' WHERE user_id='$user' and img_id='$img'");
            }
            else {
                $result = mysqli_query($link,"INSERT INTO label_img (user_id, img_id, img_name, img_type, img_data,img_labels) VALUES ('$user','$img','$name', '$type', '$data','$labels')");
            }
            $link->close();
        
            return result
        }
    }
?>
