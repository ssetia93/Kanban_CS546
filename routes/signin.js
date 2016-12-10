
var express = require('express');
var router = express.Router();
var data = require("../data");
var userData = data.signin;
var fs = require('fs');
var bcrypt = require("bcrypt-nodejs");
var uuid = require('node-uuid');
var xss = require('xss');

router.get("/initial", (req, res) => {
        res.render("signin/initial",{ partial: "signin-scripts"});
})
router.get("/membersign",(req,res)=>{
    res.render("signin/membersignup", {partial:"memberSignup-scripts",createorUpdate:"Y"});
});

router.get("/deletedprofile",(req,res)=>{
    res.render("signin/deleteorlogout", {partial:"signin-scripts",delete:true});
});

router.get("/logout",(req,res)=>{
    if(req.cookies.sessionId)
    {
        var expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() -1);
        res.cookie("sessionId", "", { expires: expiresAt });
        res.clearCookie("sessionId");
    }
    //console.log(req.cookies + " After logged out");
    res.render("signin/deleteorlogout", {partial:"signin-scripts",logout:true});
});

router.get("/memberupdate",(req,res)=>{
   // console.log("Cookie value in memeberupdate: "+ req.cookies.sessionId);
userData.getUserBySessionId(req.cookies.sessionId).then((memberInfo)=>{
        if(memberInfo)
        {
            userData.getUserById(memberInfo._id).then((userInfo)=>{
                res.render("signin/membersignup", {partial:"memberSignup-scripts",createorUpdate:"Y",firstName: memberInfo.firstName, lastName: memberInfo.lastName , email:memberInfo.email,occupation: memberInfo.occupation, password:memberInfo.password});
            }).catch((e)=>{
                res.render("error/errorpage", {partial:"signin-scripts",invalidUser:false,error:e});
            });
        }
        else{
            res.render("signin/membersignup", {partial:"memberSignup-scripts",createorUpdate:"N",firstName: memberInfo.firstName, lastName: memberInfo.lastName, email:memberInfo.email,occupation: memberInfo.occupation,password:memberInfo.password});
        }
    }).catch((e)=>{
        res.render("error/errorpage", {partial:"signin-scripts",invalidUser:true,error:e});
    })
});

router.post("/validateUser",(req, res) => {
    var userDet = req.body;
    console.log("inside validate user");
    console.log(userDet);
    var checkUser = userData.checkUser(userDet.email,"Y");

    checkUser.then((value) => {
        return userData.validateUser(userDet).then((memberObj)=>{
            console.log(memberObj);
            bcrypt.compare(userDet.password, memberObj.password, function(err, response) {
                    if (response == true) {
                       console.log("hash matched");
                       memberObj.sessionId = uuid.v4(); // setting the session ID once the user name and password matches.
                       userData.updateSession(memberObj).then((updatedObj)=>{
                           res.cookie("sessionId",updatedObj.sessionId);
                           res.json({ success: true});
                           //res.render("user/users",{users:updatedObj,success: true});
                       }).catch((e)=>{
                           res.json({ error: true, message:"Error in validating a user information"});
                       }); 
                    } else {
                        res.json({ error: true, message:"Invalid credentials"});
                    }
                })
        }).catch((e)=>{
            res.json({ error: true, message:e});
        })

    }).catch((e) => {
        res.json({ error: true, message:e});
    });
    
});

router.post("/memberSignup", (req, res) => {
    var signupData = req.body;
    
    console.log(signupData.createorUpdateBack);
    console.log(req.body);

    if(signupData.createorUpdateBack == 'Y')
    {
        console.log("After the check up")
        var checkUser = userData.checkUser(signupData.email, "N");

        checkUser.then(() => {
            console.log("User is valid to add.")
            return userData.addUser(signupData.firstName,signupData.lastName,signupData.email,signupData.occupation,signupData.password).then((newMember)=>{
                console.log("Added the member successfully");
                res.render("signin/membersignup",{ success: true,result:"You have been successfully added !",createorUpdate:"Y",partial:"memberSignup-scripts",
                    firstName: xss(newMember.firstName), lastName: xss(newMember.lastName), email:xss(newMember.email),
                    occupation:newMember.occupation,password:newMember.hashedPassword});
            }).catch((e) => {
                    console.log(e);
                    res.render("signin/membersignup",{error: e,partial:"memberSignup-scripts",createorUpdate:"Y",firstName: xss(signupData.firstname), lastName: xss(signupData.lastname), email:xss(signupData.email),occupation: xss(signupData.occupation), password:signupData.password});
            });
        }).catch((e)=>{
            console.log(e);
        });
    }
   
    else
    {
        console.log("Not Y condition")
         return userData.getUserBySessionId(req.cookies.sessionId).then((user)=>{
                return userData.updateUser(user._id,signupData.firstName,signupData.lastName,signupData.email,signupData.occupation,signupData.password).then((updatedMember)=>{
                   res.render("signin/membersignup",{ success: true,result:"Your information is updated successfully ! Please sign in again !",createorUpdate:"N",partial:"memberSignup-scripts",
                   firstName: xss(updatedMember[0].firstName), lastName: xss(updatedMember[0].lastName), 
                   email:xss(updatedMember[0].email),occupation: xss(updatedMember[0].occupation), password:updatedMember[0].hashedPassword});

                

         }).catch((e) => {
           res.render("signin/membersignup",{error:e,message:e,createorUpdate:"N",partial:"memberSignup-scripts",firstName: xss(signupData.firstname), lastName: xss(signupData.lastname), 
           email:xss(signupData.email),occupation:xss(signupData.occupation),password:signupData.password});
        });

         }).catch((e) => {
             console.log("Some error")
             console.log(e)
             res.json({error:e});
            //res.render("error/errorpage", {partial:"signin-scripts",invalidUser:true,error:e});
        });

    }


           
});

router.delete("/delete", (req, res) => {
    var member = userData.getUserBySessionIdBySessionId(req.cookies.sessionId);
    member.then((memberObj)=>{
        return userData.removeUser(memberObj._id).then(()=>{
            if(req.cookies.sessionId)
            {
                var expiresAt = new Date();
                expiresAt.setHours(expiresAt.getHours() -1);
                res.cookie("sessionId", "", { expires: expiresAt });
                res.clearCookie("sessionId");
            }
            res.json({success:true});
        }).catch((e) => {
            res.json({ error: e });
        });
    }).catch((e) => {
        res.render("error/errorpage", {partial:"signin-scripts",invalidUser:true,error:e});
    });
});

module.exports = router;
/*
{
  "_id": "6c233431-4334-44fa-80f1-d802cdc1f58a",
  "taskTitle": "Install Oracle Database",
  "creator": [
    {
      "creatorName": "Oliver Twist",
      "creatorEmail": "olive@xyz.com",
      "id": "312e7da5-8e53-4809-b946-d3f8c6f2fa1c"
    }
  ],
  "description": "We will be using the Oracle 11g database.",
  "duedate": "12/31/2016",
  "creationdate": "11/18/2016",
  "priority": "low"
}

0adead20-a418-4990-99f6-17aa64bf83e7
*/