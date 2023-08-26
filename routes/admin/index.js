const express = require('express')
const Admin = require('../../model/admin')
const router = express.Router()

// TODO: Add the signin and signup APIs for admin..

router.post('/', async (req, res) => {

    try{

        const admin = await Admin.create(req.body)

        return res.status(200).json({
            data: admin,
            message: 'Admin successfully created'
        })

    }catch(error) {

        console.log(error)
        return res.status(500).json({ 
            message: "Internal server error"
         })

    } 



})



module.exports = router