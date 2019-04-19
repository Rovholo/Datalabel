<?php
    namespace Rovholo\datalabel;
    class connect{
        function connectDetail() {
            $username = "user";
            $password = "password";
            $database = "database1";
            $link = mysqli_connect("127.0.0.1", $username ,$password , $database);
            return $link;
        }
        function closeConnection(){
            mysqli_close($this->connectDetail());
        }
    }
?>
