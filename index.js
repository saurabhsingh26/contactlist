const { urlencoded } = require('express');
const express = require('express');
const { runMain } = require('module');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();


app.set('view engine','ejs');  //First we need to tell express that ejs will be the view engine or templet engine that will be using.

app.set('views',path.join(__dirname,'views')); //We need to tell where we are we going to place our views

app.use(urlencoded()); // It will create a body with name and phone in request. It will called before every controller.

app.use(express.static('assets')); // MW to access static files

// var contactList = [
//     {
//         name: "Saurabh",
//         phone: "9876543210"
//     },
//     {
//         name: "Nhbcs  hscc",
//         phone: "9287654301"
//     },
//     {
//         name: "K hdhc",
//         phone: "8746250929"
//     }

// ]



app.get('/',function(req,res){
    // console.log(__dirname); Path where index.js file is run.
    // res.send('<h1>Cool, it is running! or is it?</h1>')
    // return res.render('home',{
    //     title:'I am flying',
    //     contact_list: contactList
    // });

    // fetching from databases
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title: "Contact Lists",
            contact_list: contacts
        });
    });
});

app.get('/practice', function(req,res){
    return res.render('practice',{
        title : "let is play with ejs"
    });
});



app.post('/create-contact', function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // return res.redirect('/');

    // OR

   // contactList.push(req.body);
   // return res.redirect('back');

   // using database
   Contact.create({
       name: req.body.name,
       phone: req.body.phone
   }, function(err,newContact){
       if(err){
           console.log('error in creating the contact');
           return;
       }
       console.log('******',newContact);
       return res.redirect('back');
   })
});

// String Parameters
// app.get('/delete-contact/:phone',function(req,res){
//     let phone = req.params.phone;
// });

// Using Query
app.get('/delete-contact/',function(req,res){
    // let phone = req.query.phone;
    // console.log(phone)
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // let contactIndex = contactList.findIndex(function(contact){
    //     return contact.phone == phone;
    // })

    // if (contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }

    // return res.redirect('back');


    // using db and id
    const id = req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server: ',err);
    }
    console.log("Yup! My express server is running on the port : ",port);
})