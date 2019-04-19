<?php
    namespace Rovholo\datalabel;
    class connect{
        function connectDetail() {
            return mysqli_connect("127.0.0.1", "user" ,"password" , "database1");
        }
    }
?>
