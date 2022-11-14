const express = require('express')
const router = express.Router();

const { isAuthenticated} = require('../controllers/auth')
const {
    getTodoAll, getTodo
} = require('../mongodb/db')
const {
    addTodoUser,
    deleteTodoUser,
    deleteAllTodoUser,
    editTodoUser,
    detailTodoUser
} = require('../controllers/user')

router.get('/', isAuthenticated, async (req, res) => {
    let db = await getTodoAll(req.user.id)
    if (db) {
        res.render('todo/index', {
            todos: db
        })
    } else {
        res.send('Internal Server Error')
    }
})
router.post('/', isAuthenticated, addTodoUser)

router.get('/add', isAuthenticated, (req, res) => {
    res.render('todo/add');
});

router.post('/delete', isAuthenticated, deleteTodoUser)
router.get('/deleteAll', isAuthenticated, deleteAllTodoUser)


router.get('/edit/:id', isAuthenticated, (req, res) => {
    res.render('todo/edit', {
        _id: req.params.id
    });
});

router.post('/edit', isAuthenticated, editTodoUser)

router.post('/detail/:id', isAuthenticated, async (req, res) => {
    let db = await getTodo(req.user.id, req.body.id)
    if (db) {
        res.render('todo/detail', {
            todos: db
        });
    } else {
        res.send('Internal Server Error')
    }
});

router.post('/detail', isAuthenticated, detailTodoUser)

module.exports = router