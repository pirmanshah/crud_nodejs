const User = require('../models/User');

module.exports = {
    index: async (req, res) => {
        try {
            const users = await User.getAll();
            res.render('index', {
                title: 'Home Page',
                users: users[0],
                msgSuccess: null,
                deleteMsg: null
            });
        } catch (err) {
            console.log(err);
        }
    },
    create: (req, res) => {
        const name = req.body.name;
        const saveUser = new User(name);

        saveUser
        .save()
        .then(result => {
            return User.getAll()
        })
        .then(users => {
            res.render('index', {
                title: 'Home Page',
                users: users[0],
                msgSuccess: true,
                deleteMsg: null
            });
        })
        .catch(err => {
            console.log(err);
        })
    },
    getById: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await User.getById(id);
            if(user[0].length > 0){
                res.render('edit', {
                    title: 'Edit Page',
                    user: user[0][0],
                    msgSuccess: null
                });
            } else {
                res.redirect('/404');
            }
        } catch (err) {
            console.log(err);
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const name = req.body.name;
        try {
            const update = await User.update(name, id);
            const user = await User.getById(id);
            res.render('edit', {
                title: 'Edit Page',
                user: user[0][0],
                msgSuccess: true
            });
        } catch (err) {
            console.log(err);
        }
    },
    destroy: (req, res) => {
        const id = req.params.id;
        User.delete(id)
        .then(()=> {
            return User.getAll()
        })
        .then(users => {
            res.render('index', {
                title: 'Home Page',
                users: users[0],
                msgSuccess: null,
                deleteMsg: true
            });
        })
        .catch(err => {
            console.log(err);
        });
    }
}