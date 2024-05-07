const express = require("express");
const mongoose = require("mongoose");
const app = express();



const path = require("path");
const chat = require("./models/chat.js");

app.use(express.static(path.join(__dirname , "public")));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));
const port = 3000;
app.use(express.urlencoded({extended : true}));
const  methodOverride = require('method-override');
app.use(methodOverride('_method'));


// conncetion with dataabse
mongoose.connect('mongodb://127.0.0.1:27017/whatapp')
  .then((res) => {
    console.log("connceted with databse");
  })
  .catch((error) => {
    console.log(error);
  });


app.listen(port , () => {
    console.log(`app server is started at port : ${port}`);
});

app.get("/" , (req , res) => {
    res.send("welcome to home page");
});

app.get("/chats" , async (req , res) => {

 let chats = await chat.find();
 res.render("chats.ejs" , {chats});
});

app.get("/chats/new" , (req , res) => {
    res.render("form.ejs");
});

app.post("/chats" , async (req , res) => {
    let {from , to , message} = req.body;
    let user1 = new chat({
        from : from,
        to : to,
        message : message,
        created_at : new Date()
    });
    await user1.save();

  res.redirect("/chats");

});


app.get("/chats/:_id/edit" ,async  (req , res) => {
    let {_id} = req.params;
    let c = await chat.findById(_id);
    console.log(c);
res.render("edit.ejs" , {chat : c});
});

// put request
app.put("/chats/:_id" , async (req , res) => {
    let {_id} = req.params;
    let {message : newmsg} = req.body;
    let dates = new Date();
    let updatedchat = await chat.findByIdAndUpdate(_id , {message : newmsg} , {runValidator : true , new: true}); 

  let updated = await chat.findByIdAndUpdate(_id , {created_at : dates}); 
  res.redirect("/chats");
});


app.delete("/chats/:_id" , (req , res) => {
  let {_id} = req.params;
  console.log(_id);
  chat.deleteOne({_id : _id})
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  })
  res.redirect("/chats");
})