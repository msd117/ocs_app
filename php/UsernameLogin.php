<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
  
    $json_obj = json_decode(file_get_contents('php://input'));
    $connection = mysqli_connect("localhost","id4640772_admin","@Msd11790","id4640772_onlinecomplaintsystem");

    $mobilenumber=mysqli_real_escape_string($connection,$json_obj->request->mobilenumber);
    $pin=mysqli_real_escape_string($connection,$json_obj->request->Pin);
    //server,user,password,db
  
    
    // Set autocommit to off
    mysqli_autocommit($connection,FALSE);

    // Check connection
    if (mysqli_connect_errno())
    {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    //fetch table rows from mysql db
    $sql = "select id from Login where mobilenumber='$mobilenumber' and Password='$pin'";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $id = "";
       while($row =mysqli_fetch_assoc($result))
       {
          $id = $row['id'];
       }
       // creat an response object
       if (!isset($response)){ 
           $response = new stdClass();
       }
   
   if(strlen($id)>0){
       $response->SUCCESS = "1";
       $response->id =$id;
   
   }else{
       $response->SUCCESS = "-1";
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

