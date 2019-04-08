<?php
namespace Rovholo\datalabel;
class init2{
  public function connectDB(){
    $servername = "localhost";
    $username = "piykvshj";
    $password = "Differ123*cpanel";

  // Create connection
    $conn = new mysqli($servername, $username, $password);

  // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully";
  }
   
}
?>
