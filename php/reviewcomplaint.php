<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
    # Get JSON as a string
    $json_str = file_get_contents('php://input');

    $connection = mysqli_connect("localhost","id4640772_admin","@Msd11790","id4640772_onlinecomplaintsystem");
    # Get as an object
    $json_obj = json_decode($json_str);

    $complaintid=mysqli_real_escape_string($connection,$json_obj->request->complaintid);
    $status=mysqli_real_escape_string($connection,$json_obj->request->status);

    
    // Check connection
    if (mysqli_connect_errno())
    {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    //fetch table rows from mysql db
   // $result = $connection->query();
    $sql = "UPDATE `complaints` SET `status` = '$status' WHERE `complaints`.`id` = $complaintid;";
   
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //  //create an array
    //  $emparray = array();
    //     while($row =mysqli_fetch_assoc($result))
    //     {
    //        $emparray[] = $row;
    //     }
        // creat an response object
        if (!isset($response)){ 
            $response = new stdClass();
        }
    
    if($result === TRUE){
        $response->SUCCESS = "1";
        $response->message = "Complaint Updated Successfully";
    }else{
        $response->SUCCESS = "-1";
       $response->message = "Complaint Updatedion Failed";
       
    }
    
    echo json_encode($response);
//    close the db connection
    mysqli_close($connection);
    
}else{
    
    echo("<h1>Get Method Not Supported.</h1>");

    echo("Get Method Not Supported.");
}



?>

