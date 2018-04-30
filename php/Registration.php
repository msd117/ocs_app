<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
    $json_obj = json_decode(file_get_contents('php://input'));
    $connection = mysqli_connect("localhost","id4640772_admin","@Msd11790","id4640772_onlinecomplaintsystem");

    $name=mysqli_real_escape_string($connection,$json_obj->request->name);
    $emailid=mysqli_real_escape_string($connection,$json_obj->request->emailid);
    $mobilenumber=mysqli_real_escape_string($connection,$json_obj->request->mobilenumber);
    $pin=mysqli_real_escape_string($connection,$json_obj->request->PIN);
    // $city=$json_obj->request->City;
    //server,user,password,db
  
    
    // Set autocommit to off
    mysqli_autocommit($connection,FALSE);

    // Check connection
    if (mysqli_connect_errno())
    {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    // $sql = "INSERT INTO `Login`(`mobilenumber`, `Password`) VALUES ('123456789','1234')";
    
        $sql = "INSERT INTO `Login`(`mobilenumber`, `Password`) VALUES ('$mobilenumber','$pin')";

   
     $result = mysqli_query($connection, $sql) or die("Error in Inserting in users " . mysqli_error($connection));

    // creat an response object
    if (!isset($response)){ 
            $response = new stdClass();
        }
    // echo $connection->insert_id;
    // echo $result;
    if($result === TRUE){

        $newuserid =$connection->insert_id;

        // $sql = "INSERT INTO `users` (`id`, `name`, `mobilenumber`, `emailid`) VALUES ('$newuserid','sohel', '123456789', 'msd117@yahoo.com')";
         $sql = "INSERT INTO `users`(`id`, `name`, `mobilenumber`, `emailid`) VALUES ('$newuserid','$name','$mobilenumber','$emailid')";
     
        $result = mysqli_query($connection, $sql) or die("Error in Inserting in Login " . mysqli_error($connection));
   
    
        // Commit transaction
        mysqli_commit($connection);


    
    
        $response->SUCCESS = "1";
        $response->message = "Registration Successful Please Login to Continue.";
        $response->cno =  (string) $newuserid;
    
    }else{

        // Rollback transaction
        mysqli_rollback($connection);
        $response->SUCCESS = "-1";
       $response->message = "Registration failed. please try again later.";
       
    }
    
    echo json_encode($response);
//    close the db connection
    mysqli_close($connection);
    
}else{
    
    echo("<h1>Get Method Not Supported.</h1>");

    echo("Get Method Not Supported.");
}



?>

