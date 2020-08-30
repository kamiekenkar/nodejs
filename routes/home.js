const express = require('express');
const router = express.Router()
const path = require('path')

router.get('/',(req,res) =>{
    let title = 'hello roocket page'
    let list = [
        'item 11',
        'item 22',
        'item 33'
    ]
    res.cookie('name','hesam', { maxAge : 1000 * 60*60*24*7,httpOnly:true })
    res.cookie('family','musavi',{ maxAge : 1000 * 60*60*24*7,httpOnly:true })

 /*    if(req.session.view){
        req.session.view += 1;
    } else {
        req.session.view = 1;
    } */

    console.log(req.session.view);
    res.render('home/index',{ title,mylist:list})
    //res.sendFile(path.join(__dirname,'../views/index.html'))
})




router.get('/articles/:data',(req,res) =>{
    console.log(req.params)
    res.send('data');
})

router.get('/articles/:id',(req,res) =>{
    console.log(req.params)
    res.send('id param');
})

router.route('/contact-us')
.get((req,res) =>{
   // console.log(req.cookies)
   // res.sendFile(path.join(__dirname,'../views/contact-us.html'))
    res.render('contact-us')
})
.post((req,res) =>{
    console.log(req.body)
    res.send('this is post request')
})
.put((req,res) =>{
    console.log(req.body)
    res.send('this is put request')
})

.patch((req,res) =>{
    console.log(req.body)
    res.send('this is patch request')
})

.delete((req,res) =>{
    console.log(req.body)
    res.send('this is delete request')
})


module.exports = router;