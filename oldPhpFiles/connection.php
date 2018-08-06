<?php

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $name=$_GET["UserName"];
//     $password=$_GET["Password"];
    //  $name="Nadee";
    // $password="Mohammed";
  //servername,username,password,database
  $connection = mysqli_connect("localhost","id3472410_mydb","N@deem210","id3472410_mydatabase");

// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

   //fetch table rows from mysql db
    $sql = "SELECT * FROM `Members`";
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
    $response->data = $emparray;
    
    //echo($emparray);
    }else{
        $response->status = "FAILURE";
        $response->message = "Please try again later";
    }
    
    echo json_encode($response);
    //close the db connection
    mysqli_close($connection);
    
// }else{
    
//     echo("<h1>Get Method Not Supported.</h1>");

//     echo("Get Method Not Supported.");
// }



?>

