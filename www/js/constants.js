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
        "loginURL":"https://inanimate-dissemina.000webhostapp.com/login.php",
        "newcomplaint":"https://ocs-project.000webhostapp.com/api/newcomplaint.php",
        "viewcomplaint":"https://ocs-project.000webhostapp.com/api/ViewComplaints.php",
        "complaintbyid":"https://ocs-project.000webhostapp.com/api/complaintbyid.php",
        "registration":"https://ocs-project.000webhostapp.com/api/Registration.php",
        "login":"https://ocs-project.000webhostapp.com/api/Login.php",
        "UsernameLogin":"https://ocs-project.000webhostapp.com/api/UsernameLogin.php",

        
        // "newcomplaint":"https://ocs-project.000webhostapp.com/api/newcomplaint.php",
        // "viewcomplaint":"https://ocs-project.000webhostapp.com/api/ViewComplaints.php",
        // "complaintbyid":"https://ocs-project.000webhostapp.com/api/complaintbyid.php",
        // "registration":"https://ocs-project.000webhostapp.com/api/Registration.php",
        // "login":"https://ocs-project.000webhostapp.com/api/Login.php",
        // "UsernameLogin":"https://ocs-project.000webhostapp.com/api/UsernameLogin.php",
        "viewcomplaintnearme":"https://ocs-project.000webhostapp.com/api/viewcomplaintsnearme.php",
        "mydetails":"https://ocs-project.000webhostapp.com/api/mydetails.php",
        "forgotpassword":"https://ocs-project.000webhostapp.com/api/forgotpassword.php",
        
        
        "ls_mobilenumber":"mobilenumber",
        
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
