angular.module('starter.constants', [])
    .constant('GlobalConstants', {
        "appName": "Online Complaint System",
        "appVersion": "1.0.0",
        "appRefNo":"com.stepup.kileark",
        "responseType": "json",
        "responseTimeOut":120000,
        "errorAlertHeader":"Error",
        "infoAlertHeader":"Info",
        "MembersURL":"https://inanimate-dissemina.000webhostapp.com/connection.php",
        "loginURL":"http://support.warithsoftware.com/service.asmx/MobileLogin",
         "lotterytype":"http://support.warithsoftware.com/service.asmx/GetLotteryType",
         "SubmitlotteryNo":"http://support.warithsoftware.com/service.asmx/SubmitLotteryNumber",
        "newcomplaint":"https://onlinecomplaintsystem.000webhostapp.com/newcomplaint.php",
        "viewcomplaint":"https://onlinecomplaintsystem.000webhostapp.com/ViewComplaints.php",
        "complaintbyid":"https://onlinecomplaintsystem.000webhostapp.com/complaintbyid.php",
        "registration":"https://onlinecomplaintsystem.000webhostapp.com/Registration.php",
        "login":"https://onlinecomplaintsystem.000webhostapp.com/Login.php",
        "UsernameLogin":"https://onlinecomplaintsystem.000webhostapp.com/UsernameLogin.php",
        

         // LocalStorage Keys
        "ls_UserName": "username",
        "ls_Password": "password",
        
        
        
        
        "complaints":[
            {"title": "Litter and Trash","divider":true},
            {"title": "Litter"},
            {"title": "Overflowing trash can"},
            {"title": "Health and Hazards","divider":true},
            {"title": "Dead animal pick-up"},
            {"title": "Gutter overflow"},
            {"title": "Street damage","divider":true},
            {"title": "Broken sign"},
            {"title": "Pothole"},
            {"title": "Illegal parking"},
            {"title": "Lights","divider":true},
            {"title": "Parks lights"},
            {"title": "Street light not working"},
            {"title": "Traffic signal"},
            {"title": "General","divider":true},
            {"title": "Others"},
        ]
    });