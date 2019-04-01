<?php
    $servername = "localhost";
    $username = "piykvshj";
    $password = "Differ123*cpanel";
    
    $link = new mysqli($servername,$username,$password,"piykvshj_database1");

    if ($link->connect_error) {
        die("connection failed: " . $link->connect_error);
    }
    $fileName = $_FILES['file']['name'];
    $fileType = $_FILES['file']['type'];
    $fileContent = file_get_contents($_FILES['file']['tmp_name']);
    $data = base64_encode($fileContent);
    $dataUrl = 'data:' . $fileType . ';base64,' . base64_encode($fileContent);
    $json = json_encode(array(
        'name' => $fileName,
        'type' => $fileType,
        'dataUrl' => $dataUrl,
        'username' => $_REQUEST['username'],
        'accountnum' => $_REQUEST['accountnum']
    ));
    echo $json;
    #echo "something";
    #echo "now". $user. "thats ric";
    $result = mysqli_query($link,"INSERT INTO images2 (img_name, img_type, img_data) VALUES ('$fileName', '$fileType', '$dataUrl')");
    $link->close();
    #echo $result;
    #echo "connected successfully <br />";
    #echo json_encode($result);
    #$arr = array();
    #while ($row = mysqli_fetch_assoc($result)) 
    #{
        #echo json_encode($result);
    #    array_push($arr, $row);
    #}
    #echo json_encode($arr);
?>