const mongoose = require("mongoose");
const chat = require("./models/chat.js");

mongoose.connect('mongodb://127.0.0.1:27017/whatapp')
  .then((res) => {
    console.log("connceted with databse");
  })
  .catch((error) => {
    console.log(error);
  });


  let allchat = [
    {
        from : "neha",
    to : "prity" ,
    message : "when result will be publlih",
    created_at : new Date()
    },
    {
        from : "subhtoto",
    to : "atika" ,
    message : "today is hot",
    created_at : new Date()
    },
    {
        from : "atif",
    to : "atifa" ,
    message : "what are you doing",
    created_at : new Date()
    },
    {
        from : "sammay",
    to : "ram" ,
    message : "go to tution",
    created_at : new Date()
    },
    {
        from : "ram",
    to : "bob" ,
    message : "are you from japan",
    created_at : new Date()
},
    {
        from : "riteh",
    to : "dhiam" ,
    message : "are u a good boy",
    created_at : new Date()
},
    {
        from : "ati",
    to : "atika" ,
    message : "i will not go to school today",
    created_at : new Date()
},
  ];

  chat.insertMany(allchat);
