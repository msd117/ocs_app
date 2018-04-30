<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
    # Get JSON as a string
    $json_str = file_get_contents('php://input');

    # Get as an object
    $json_obj = json_decode($json_str);

    $memberId=$json_obj->request->MemberId;
    $entrydate=$json_obj->request->EntryDate;
    $amount=$json_obj->request->Amount;
    $total=$json_obj->request->Total;
    
    $connection = mysqli_connect("localhost","id3472410_mydb","N@deem210","id3472410_mydatabase");
    
    // Check connection
    if (mysqli_connect_errno())
    {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    //fetch table rows from mysql db
     $sql = "INSERT INTO `Statements`(`MemberId`, `Date`, `Amount`, `Total`) VALUES ('$memberId','$entrydate','$amount','$total')";
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
        $response->status = "SUCCESS";
        $response->message = "Amount Inserted Successfully.";
    
    }else{
        $response->status = "FAILURE";
       $response->message = "Invalid Credentials";
       
    }
    
    echo json_encode($response);
//    close the db connection
    mysqli_close($connection);
    
}else{
    
    echo("<h1>Get Method Not Supported.</h1>");

    echo("Get Method Not Supported.");
}



?>

