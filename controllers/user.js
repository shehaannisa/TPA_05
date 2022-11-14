let { checkEmail, createUser, editTodo, detailTodo, createTodo, deleteTodo, deleteAllTodo, deleteUser } = require('../mongodb/db')
let { getHashedPassword } = require('./function')

async function registerUser(req, res) {
    try {
        let {name, email, password, confirmPassword } = req.body
        if(name == '' || email == '' || password == '' || confirmPassword == '') {
            res.render('register', {
                message: 'Masukkan Nama, Email, dam Password!',
                messageClass: 'alert-danger'
            });
            return
        }
        if(password.length < 6 || confirmPassword < 6) {
            res.render('register', {
                message: 'Password minimal terdapat 6 karakter',
                messageClass: 'alert-danger'
            });
            return
        }
        if(password === confirmPassword) {
            let checking = await checkEmail(email)
            if(checking) {
                res.render('register', {
                    message: 'Pengguna sudah terdaftar',
                    messageClass: 'alert-danger'
                })
                return
            }
            let hashedPassword = getHashedPassword(password)
            createUser(name, email, hashedPassword)
            res.render('login', {
                message: 'Registrasi berhasil. Silakan login untuk melanjutkan!',
                messageClass: 'alert-success'
            });
            return
        } else {
            res.render('register', {
                message: 'Password tidak sesuai',
                messageClass: 'alert-danger'
            });
            return
        }
    } catch(err) {
        console.log(err)
    }
}

async function addTodoUser(req, res) {
    try {
        let { title, dueDate, descTask } = req.body
        if (title == '' || dueDate == '' || descTask == '') {
            res.render('todo/add', {
                message: 'Input Title and dueDate!',
                messageClass: 'alert-danger'
            })
            return
        }
        createTodo(req.user.id, title, dueDate, descTask)
        res.redirect('/todo')
    } catch(err) {
        console.log(err)
    }
}

async function deleteTodoUser(req, res) {
    try {
        deleteTodo(req.user.id, req.body.id)
        res.redirect('/todo')
    } catch (error) {
        console.log(error)
    }
}

async function deleteAllTodoUser(req, res) {
    try {
        deleteAllTodo(req.user.id)
        res.redirect('/todo')
    } catch (error) {
        console.log(error)
    }
}

async function editTodoUser(req, res) {
    try {
        let { title, dueDate, descTask, id } = req.body
        editTodo(req.user.id, req.body.id, title, dueDate, descTask)
        res.redirect('/todo')
    } catch (error) {
        console.log(error)
    }
}

async function detailTodoUser(req, res) {
    try {
        let { title, dueDate, descTask, id } = req.body
        detailTodo(req.user.id, req.body.id, title, dueDate, descTask)
        res.redirect('/todo')
    } catch (error) {
        console.log(error)
    }
}

async function deleteUserAccount(req, res) {
    try {
        let id = req.user.id
        let { resp } = req.body
        if (resp == 'yes') {
            deleteUser(id)
            res.render('login', {
                message: 'Succes Deleted Account, Please Register',
                messageClass: 'alert-success'
            });
        } else {
            res.redirect('/todo')
        }
    } catch(error) {
        console.log(error)
    }
}

module.exports = { registerUser, addTodoUser, deleteTodoUser,deleteAllTodoUser, editTodoUser, detailTodoUser, deleteUserAccount }
