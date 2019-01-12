<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
  
    $json_obj = json_decode(file_get_contents('php://input'));
    $connection = mysqli_connect("localhost","id4640772_admin","@Msd11790","id4640772_onlinecomplaintsystem");

    $mobilenumber=mysqli_real_escape_string($connection,$json_obj->request->mobilenumber);
    
    //server,user,password,db
  
    
    // Set autocommit to off
    mysqli_autocommit($connection,FALSE);

    // Check connection
    if (mysqli_connect_errno())
    {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    //fetch table rows from mysql db
    
    $sql = "select `name`, `mobilenumber`, `emailid` from `users` where mobilenumber='$mobilenumber' ";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $useremail ="";
    $username ="";
       while($row =mysqli_fetch_assoc($result))
       {
        $useremail = $row['emailid'];
        $username = $row['name'];
       }
       // creat an response object
       if (!isset($response)){ 
           $response = new stdClass();
       }
   
    if(strlen($useremail)>0){
        $response->SUCCESS = "1";
     


        // if(isset($_POST['email'])) {
            // EDIT THE 2 LINES BELOW AS REQUIRED
            $email_to = $useremail ;
            $email_subject = "Forgot Password";
             function died($error) {
                // your error code can go here
                echo "We are very sorry, but there were error(s) found with the form you submitted. ";
                echo "These errors appear below.<br /><br />";
                echo $error."<br /><br />";
                echo "Please go back and fix these errors.<br /><br />";
                die();
            }
            // validation expected data exists
            // if(!isset($_POST['first_name']) ||
            //     !isset($_POST['email']) ||
            //     !isset($_POST['comments'])) {
            //     died('We are sorry, but there appears to be a problem with the form you submitted.');      
            // }
            $first_name =  $username; // required
            $email_from = "javahostingtest@gmail.com"; // required
            $comments = "your password is 1234"; // required
            $error_message = "";
            // $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
         
        //   if(!preg_match($email_exp,$email_from)) {
        //     $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
        //   }
        //     $string_exp = "/^[A-Za-z .'-]+$/";
        //   if(!preg_match($string_exp,$first_name)) {
        //     $error_message .= 'The First Name you entered does not appear to be valid.<br />';
        //   }
        //   if(strlen($comments) < 2) {
        //     $error_message .= 'The Comments you entered do not appear to be valid.<br />';
        //   }
        //   if(strlen($error_message) > 0) {
        //     died($error_message);
        //   }
            $email_message = "Form details below.\n\n";
            // function clean_string($string) {
            //   $bad = array("content-type","bcc:","to:","cc:","href");
            //   return str_replace($bad,"",$string);
            // }
            $email_message .= "First Name: ".$first_name."\n";
            $email_message .= "Email: ".$email_from."\n";
            $email_message .= "Comments: ".$comments."\n";
        // create email headers
        $headers = 'From: '.$email_from."\r\n".
        'Reply-To: '.$email_from."\r\n" .
        'X-Mailer: PHP/' . phpversion();
        @mail($email_to, $email_subject, $email_message, $headers); 
     
        // }
    
    }else{
       $response->SUCCESS = "-1";
      $response->message = "Invalid Mobile Number";
      
   }
   
   echo json_encode($response);
//    close the db connection
   mysqli_close($connection);
   
}else{
   
   echo("<h1>Get Method Not Supported.</h1>");

   echo("Get Method Not Supported.");
}




 
?>