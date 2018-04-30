<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
    # Get JSON as a string
    $json_str = file_get_contents('php://input');

    # Get as an object
    $json_obj = json_decode($json_str);

    $id=$json_obj->request->memberId;
    //$password=$json_obj->request->Password;;
    
    $connection = mysqli_connect("localhost","id3472410_mydb","N@deem210","id3472410_mydatabase");
    
    // Check connection
    if (mysqli_connect_errno())
    {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    //fetch table rows from mysql db
     $sql = "select * from Statements where MemberId='$id'";
     $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

     //create an array
     $emparray = array();
        while($row =mysqli_fetch_assoc($result))
        {
           $emparray[] = $row;
        }
        // creat an response object
        if (!isset($response)){ 
            $response = new stdClass();
        }
    
    if(count($emparray)>0){
        $response->status = "SUCCESS";
        $response->response = $emparray;
    
    }else{
        $response->status = "FAILURE";
       $response->message = "Please Try Again later";
       
    }
    
    echo json_encode($response);
//    close the db connection
    mysqli_close($connection);
    
}else{
    
    echo("<h1>Get Method Not Supported.</h1>");

    echo("Get Method Not Supported.");
}



?>

