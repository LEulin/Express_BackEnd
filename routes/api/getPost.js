const express = require('express');
const router = express.Router();
const multer = require('multer');
var object

// const User = require('../../model/User');
const posts = require('../../model/Post');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
  });

  var upload = multer({ storage: storage });

router.post('/createPost', upload.single('files'),(req, res) => {
    var details = JSON.parse(req.body.details)
    var account_id = mongoose.Types.ObjectId(details.account_id);

    var new_post = new post({
        account_id : account_id,
        post_text : details.post_text,
        // post_image: details.post_image 

    })

    new_post.save((err, saved)=>{
        if (err) {
            return next(err);
        } else {
            res.send('Post created succesfully!')
        }
    })
    
    // posts.find().then(response => {
    //     if(response){
    //         res.send({
    //             status: 200,
    //             response: response
    //         });
    //     }
    // })
});

router.get('/getPost', (req, res) => {
    posts.find().then(response => {
        if(response){
            res.send({
                status: 200,
                response: response
            });
        }
    })
});


module.exports = router;