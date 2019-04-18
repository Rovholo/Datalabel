<?php
    namespace Rovholo\datalabel;
    class connect{
        function connectDetail() {
            $username = "piykvshj";
            $password = "Differ123*cpanel";
            $database = "piykvshj_database1";
            $link = mysqli_connect("127.0.0.1", $username ,$password , $database);
            return $link;
        }
        function closeConnection(){
            mysqli_close($this->connectDetail());
        }
    }
?>
