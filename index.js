const express = require('express');
const app = express();
const mySql = require('mysql');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

app.use(cors());

const url = "mongodb+srv://back_api:back1234@cluster0.ilsr2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.json({limit: "1mb"}));

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database successfull');
}).catch((error) => {
    // console.log(url);
    console.log("********************************", error);
})

const authSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    send_request: [],
    get_request: [],
    accepted_request: []
})

const user = mongoose.model('back_user', authSchema);

app.get('/', async (req, res) => {
    const all = await user.find();
    // console.log(all);
    var users_arr = [];
    all.map((element) => {
        var temp_user = {
            id: element._id,
            name: element.name
        }
        users_arr.push(temp_user);
    })
    // console.log(req.query.curnt_user);
    const requests = all.filter((item,index)=>{
        return item._id == req.query.curnt_user;
    })
    console.log(requests[0].send_request);
    res.send({users: users_arr, send_request: requests[0].send_request, get_request: requests[0].get_request});
})

app.post('/', (req, res) => {
    // console.log(req.body);
    res.json({sjhfvkfks: "ehfwkfgwk"});
})

//Signup section
app.post("/signup", async (req, res) => {
    const sing_user = req.body.user;
    const password = sing_user.password
    console.log(password, typeof(password));
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
        });
    })
    console.log(hashedPassword);
    const exist_user = await user.findOne({email: sing_user.email});
    // console.log("((((((((((((((((((()))))))))))))))))))", exist_user);
    if(!exist_user){
        const new_user = new user({userName: sing_user.userName,name: sing_user.name, email: sing_user.email, password: hashedPassword, age: sing_user.age, country: sing_user.country, city: sing_user.city});
        await new_user.save();
        res.json({status: "Success"});
    }
    else{
        res.json({status: "Already existing"});
    }
    // res.json({msg: 'Hey all is good now'});
})

//Login section
app.post('/login', async (req, res) => {
    const user_log_details = req.body.log_details;
    const exist_user = await user.findOne({email: user_log_details.email});
    console.log(user_log_details, user_log_details.email);
    console.log(exist_user);
    if(exist_user){
        const match = await bcrypt.compare(user_log_details.password, exist_user.password);
        if(match){
            res.json({status: match, user: exist_user._id});
        }
        else{
            res.json({status: match});
        }
    }
    else{
        res.json({status: "User does not exist."});
    }
})

//Request section
app.post('/sendrequest', async (req, res) => {
    const request_body = req.body;
    console.log(request_body);
    await user.findOneAndUpdate({_id: request_body.sending_id}, {$addToSet: {send_request: request_body.requested_id}});
    await user.findOneAndUpdate({_id: request_body.requested_id}, {$addToSet: {get_request: request_body.sending_id}});
})

app.post('/deleterequest', async (req, res) => {
    const request_body = req.body;
    console.log(request_body);
    await user.findOneAndUpdate({_id: request_body.curent_user_id}, {$pull: {get_request: request_body.requested_id}});
    // await user.findOneAndUpdate({_id: request_body.requested_id}, {$addToSet: {get_request: request_body.sending_id}});
})

app.post('/acceptrequest', async (req, res) => {
    const request_body = req.body;
    console.log(request_body);
    await user.findOneAndUpdate({_id: request_body.curent_user_id}, {$pull: {get_request: request_body.requested_id}});
    await user.findOneAndUpdate({_id: request_body.curent_user_id}, {$addToSet: {accepted_request: request_body.requested_id}});
    // await user.findOneAndUpdate({_id: request_body.requested_id}, {$addToSet: {get_request: request_body.sending_id}});
})

app.listen(8080, () => {
    console.log("Port is running on 8080");
})