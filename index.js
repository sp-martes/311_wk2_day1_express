
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000
const { users } = require('./state')
let count = users.length +1
app.use(bodyParser.json())
app.get("/users", function(req,res){
    res.json(users) 
})

app.get("/users/:id", function (req, res) {
    let ID =  req.params.id -1
    let chosenUser = users[ID] 
       
    if(!chosenUser){
        res.status(404).send("User not found")
    } 
    res.json(chosenUser) 
});


// app.post("/users", function (req,res){
//     let addedUser = {
//         "_id": count,
//         "name": "Old Gregg",
//         "occupation": "lake dweller",
//         "avatar": "https://static.wikia.nocookie.net/mightyboosh/images/b/b6/Old_Gregg.jpg/revision/latest?cb=20090417120306"
//     }
//     let found = users.find(user => user.name == addedUser.name);
//     if(found){
//         return res.send('user already exists')
//     }
//     count ++;
//     users.push(addedUser);
//     res.json(users.slice(-1));
// });

app.post("/users", function (req,res){
    console.log(req.body);
    let newUser = {
        "_id": count,
        "name": req.body.name,
        "occupation": req.body.occupation,
        "avatar": req.body.avatar
    }
    count ++;
    users.push(newUser);
    res.json(users)
});

app.put("/users/:id", function (req, res) {
    let ID =  req.params.id -1
    let chosenUser = users[ID] 
    chosenUser.occupation = 'classified'
    
    res.json(chosenUser) 
});

// app.delete("/users/:id", function(req,res){
//     let ID =  req.params.id -1
//     let chosenUser = users[ID] 
//     users.splice(ID,1)
//     res.json(users)
// });   

app.delete("/users/:id", function(req,res){
    let ID =  req.params.id -1
    let chosenUser = users[ID] 
    chosenUser.isActive = false;
    res.send('deleted')
});   

app.listen(port, () => 
  console.log(`Practice app listening on port ${port}!`));

