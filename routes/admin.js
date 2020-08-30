const express = require('express')
const router =express.Router();


router.get('/',(req,res)=> {
    res.send('this is admin route')
})
router.get('/articles',(req,res) =>{
    res.send('this is article routes');
})
module.exports = router;