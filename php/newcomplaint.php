<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
    # Get JSON as a string
    $json_str = file_get_contents('php://input');

    $connection = mysqli_connect("localhost","id4640772_admin","@Msd11790","id4640772_onlinecomplaintsystem");
    # Get as an object
    $json_obj = json_decode($json_str);

    $date=mysqli_real_escape_string($connection,$json_obj->request->date);
    $image=mysqli_real_escape_string($connection,$json_obj->request->image);
    $lat=mysqli_real_escape_string($connection,$json_obj->request->lat);
    $lang=mysqli_real_escape_string($connection,$json_obj->request->lang);
    $address=mysqli_real_escape_string($connection,$json_obj->request->address);
    $complainttype=mysqli_real_escape_string($connection,$json_obj->request->complainttype);
    $description=mysqli_real_escape_string($connection,$json_obj->request->description);
    $submittedby=mysqli_real_escape_string($connection,$json_obj->request->submittedby);
    
    
    
    // Check connection
    if (mysqli_connect_errno())
    {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    //fetch table rows from mysql db
   // $result = $connection->query();
    $sql = "INSERT INTO `complaints` (`date`, `image`, `lat`, `lang`,`address`,`complainttype`,`description`, `submittedby`) VALUES ('$date', '$image', '$lat', '$lang','$address','$complainttype','$description', '$submittedby')";
    // $sql = "INSERT INTO `Statements`(`MemberId`, `Date`, `Amount`, `Total`) VALUES ('$memberId','$entrydate','$amount','$total')";
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
        $response->message = "Complaint Registered Successfully";
        $response->complaintid = (string) $connection->insert_id;
    }else{
        $response->SUCCESS = "-1";
       $response->message = "Complaint Registration Failed";
       
    }
    
    echo json_encode($response);
//    close the db connection
    mysqli_close($connection);
    
}else{
    
    echo("<h1>Get Method Not Supported.</h1>");

    echo("Get Method Not Supported.");
}



?>

