<?php
     namespace Rovholo\datalabel;
    class register{
        function register($username,$email,$pass) {
            $link = mysqli_connect("localhost","user","password","database1");
            if ($link->connect_error) {
                die("connection failed: " . $link->connect_error);
            }
            if($username == "" || $pass == "" || $email == "")  {
                return "invalid input";
            }
            if( !strpos($email,"@") && !strpos($email, ".") && count($email) < 10 ) ) {
                return "invalid email";
            }
    
            $result = mysqli_query( $link,"INSERT INTO users(user_name, user_email, password) VALUES('$username', '$email', '$pass')" );
            $link->close();
            return $result;
        }
    }
?>
