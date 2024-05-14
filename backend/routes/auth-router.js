const express = require("express");
const router =  express.Router();
const authenticate = require("../middlewares/authenticate");
const authControllers = require("../controllers/auth-controller")
const signupschema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

router.route("/").get(authControllers.home);
router.get("/about",async (req,res) => {
  try {
  res.status(200).send("Welcome to about page");
} catch (error) {
  res.status(400).send("Error Occured");
};
});

router.get("/contact",async (req,res) => {
  try {
  res.status(200).send("Welcome to contact page");
} catch (error) {
  res.status(400).send("Error Occured");
};
});

router.post("/contact",authControllers.saveMessage);

router.get("/signup",async (req,res) => {
  if(req.session.user){
    return res.json({
        auth : false
    });
}
return res.json({
    auth : auth
}); 
});
router.post("/signup",validate(signupschema),authControllers.signup);

router.get('/logout',(req, res) =>{
    // res.clearCookie('jwtoken', { path: '/' });
  
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Error logging out');
    } else {
      res.status(200).send('Logout successful');
    }
  });   
});

router.post('/login',authControllers.login);

router.get("/login",async (req,res) => {
    if(req.session.user){
        return res.json({
            auth : true
        });
    }
    return res.json({
        auth : false
    });
});

router.get("/getdata",async (req,res) => {
  try {
      res.status(200).send({user:req.session.user});
  } catch (error) {
      res.status(400).send("Error Occured");
  }
});

router.get("/editprofile",async (req,res) => {
  try {
      res.status(200).send("Welcome to edit profile");
  } catch (error) {
      res.status(400).send("Error Occured");
  }
});

router.get("/getuserdata", authControllers.userprofile);

router.put("/editprofile", authControllers.updateprofile);

router.get("/changepassword",async (req,res) => {
  try {
      res.status(200).send("Welcome to change password");
  } catch (error) {
      res.status(400).send("Error Occured");
  }
});

router.put("/changepassword",authControllers.changePassword);

router.get("/adminusers",async (req,res) => {
  try {
      res.status(200).send("Welcome to admin users");
  } catch (error) {
      res.status(400).send("Error Occured");
  }
});

router.get("/getusersadmin",authControllers.adminUsers);


module.exports = router