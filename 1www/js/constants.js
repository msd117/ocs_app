angular.module('starter.constants', [])
    .constant('GlobalConstants', {
        "appName": "Lottery App",
        "appVersion": "1.0.0",
        "responseType": "json",
        "responseTimeOut":120000,
        "errorAlertHeader":"Error",
        "infoAlertHeader":"Info",
        

         // LocalStorage Keys
        "ls_UserName": "username",
        "ls_Password": "password",
        "ls_simno": "simno",
        
        
        
        
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
