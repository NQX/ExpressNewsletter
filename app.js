const path = require('path')
const express = require('express');
const mongoose = require('mongoose');

const multer = require('multer')
const ejs = require('ejs');




require('dotenv').config({
    path: './.ENV'
});

const app = express();

//ejs
app.set('view engine', 'ejs')

//static
app.use(express.static('./static'))






app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

//app.use(bodyParser.json())




//routes



app.get('/', (req, res) => {
    res.render('home')
});











app.post('/profile', function(req, res) {

    var storage = multer.diskStorage({
            destination: __dirname+'/uploads/',
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            },
            fileFilter: function (req, file, cb) {
                checkFileType(file, cb);
            }
        });
   
   
        var upload = multer({ storage : storage}).any();

        upload(req,res,function(err) {
            if(err) {
                console.log(err);
                return res.end("Error uploading file.");
            } else {
               console.log(req.body);
               console.log(req.files);
               req.files.forEach( function(f) {
                 console.log(f);
                 // and move file to final destination...  
               });
              res.end("File has been uploaded");
            }
            });

  });





function checkFileType(file, cb) {
    console.log('new name')
    const filetypes = /jpeg|jpg|png|gif/

    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())

    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('error: image only')
    }
}









  


//Connect to DB
/*
mongoose.set('useUnifiedTopology', true)

mongoose.connect(
        process.env.TEST_CONNECTION, {
            useNewUrlParser: true
        },
        () => console.log('connected to db'), {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        }
    )
    .catch(e => console.log("DB error ", e))

var db = mongoose.connection;

db.on('error', console.error.bind(console, "mongodb error"))
*/




app.listen(8080, function () {
    console.log('example app listening aon port 8080')
});


