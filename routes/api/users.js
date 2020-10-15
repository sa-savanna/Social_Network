const express = require('express')
const router = express.Router();
const gravatar = require('gravatar');
const normalize = require('normalize-url');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')

//get api/users

router.post("/", [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body);

        const { name, email, password } = req.body

        try {
            //see if user exist
            let user = await User.findOne({ email })
            if (user) {
                return res.status(400).json({ errors: [{ msg: "User already exist" }] })
            }
            
            //get users gravatar
            const avatar = normalize(
                gravatar.url(email, {
                  s: '200', //size
                  r: 'pg', //rading
                  d: 'mm' //default avatar
                }),
                { forceHttps: true }
              );
            
            user = new User({
                name,
                email,
                avatar,
                password
            })

            //encrypt password 
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            await user.save()

            //return jsonwebtoken
            // res.send("User registered") //data has shown in mongoDB
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({ token })
            })

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error")
        }
    })




module.exports = router;