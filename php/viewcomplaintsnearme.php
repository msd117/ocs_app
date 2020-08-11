<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

 $json_str = file_get_contents('php://input');
 
 $connection = mysqli_connect("localhost","id4640772_admin","@Msd11790","id4640772_onlinecomplaintsystem");
     # Get as an object
     $json_obj = json_decode($json_str);
     $submittedby=mysqli_real_escape_string($connection,$json_obj->request->submittedby);
 
 // Check connection
if (mysqli_connect_errno())
 {
 echo "Failed to connect to MySQL: " . mysqli_connect_error();
 }

  //fetch table rows from mysql db
   $sql = "SELECT `id`, `lat`, `lang`, `complainttype` FROM `complaints` ";
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
    $response->SUCCESS = "1";
   $response->records = $emparray;
  
 
   }else{
    $response->SUCCESS = "-1";
    $response->message = "Something Went Wrong";
   }
  
   echo json_encode($response);
   mysqli_close($connection);
  
}else{
  
    echo("<h1>Get Method Not Supported.</h1>");

    echo("Get Method Not Supported.");
}



