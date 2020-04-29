const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {firstname, lastname, username, email, password} = req.body
        const db = req.app.get('db')
        let user1 = await db.auth.check_user(username)
        let user2 = await db.auth.check_email(email)
        if(user1[0]){
            return res.status(400).send('USERNAME ALREADY TAKEN.')
        }
        if(user2[0]){
            return res.status(400).send('EMAIL ALREADY TAKEN')
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let newUser = await db.auth.register_user({firstname, lastname, username, email, password: hash})
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    login: async(req, res) => {
        const {email, password} = req.body
        console.log("email", email)
        const db = req.app.get('db')

        let user = await db.auth.check_email(email)
        if(!user[0]){
            return res.status(400).send('EMAIL NOT FOUND')
        }

        const authenticated = bcrypt.compareSync(password, user[0].password)
        if(!authenticated){
            return res.status(401).send('WRONG PASSWORD.')
        }

        delete user[0].password
        req.session.user = user[0]
        res.status(202).send(req.session.user)
    },
    logout: (req, res) => {
        console.log("ding")
        console.log(req.session)
        req.session.destroy()
        res.sendStatus(200)
    }
}