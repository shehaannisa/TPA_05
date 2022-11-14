const ObjectID = require('mongodb').ObjectID
const {
    User
} = require('./model')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')

async function createUser(name, email, pass) {
    let obj = {
        name: name,
        email: email,
        password: pass,
        todo: []
    }
    await User.create(obj)
}
module.exports.createUser = createUser

async function checkEmail(email) {
    let users = await User.findOne({
        email: email
    })
    if (users !== null) {
        console.log(users.email)
        return users.email
    } else {
        return false
    }
}
module.exports.checkEmail = checkEmail

async function checkAuth(email, pass) {
    let users = await User.findOne({
        email: email
    })
    if (email === users.email && pass === users.password) {
        return true
    } else {
        return false
    }
}
module.exports.checkAuth = checkAuth

async function deleteUser(id) {
    User.deleteOne({
        _id: id
    }, function (err, obj) {
        if (err) throw err;
    })
}
module.exports.deleteUser = deleteUser

async function getTodoAll(id) {
    let users = await User.findOne({
        _id: id
    }).lean()
    let db = users.todo
    if (users !== null) {
        return db
    } else {
        return false
    }
}
module.exports.getTodoAll = getTodoAll

async function getTodo(id, idTodo) {
    let users = await User.findOne({
        _id: id
    }).lean()
    let arr = users.todo
    arr = arr.filter(item => item._id == idTodo)
    let db = arr
    if (users !== null) {
        return db
    } else {
        return false
    }
}
module.exports.getTodo = getTodo

async function createTodo(id, title, dates, descTask) {
    const time = moment(Date.now()).format('DD/MM HH:mm:ss')
    let users = await User.findOne({
        _id: id
    })
    let todos = users.todo
    let obj = {
        _id: new ObjectID(),
        title: title,
        dueDate: dates,
        time: time,
        descTask: descTask
    }
    todos.push(obj)
    User.updateOne({
        _id: id
    }, {
        todo: todos
    }, function (err, obj) {
        if (err) throw err;
    })
}
module.exports.createTodo = createTodo

async function deleteTodo(id, idTodo) {
    let users = await User.findOne({
        _id: id
    })
    let arr = users.todo
    arr = arr.filter(item => item._id != idTodo)
    User.updateOne({
        _id: id
    }, {
        todo: arr
    }, function (err, obj) {
        if (err) throw err;
    })
}
module.exports.deleteTodo = deleteTodo


async function editTodo(id, idTodo, title, dates, descTask) {
    let users = await User.findOne({
        _id: id
    })
    let arr = users.todo
    let index = arr.findIndex(x => x._id == idTodo)
    arr[index].title = title
    arr[index].dueDate = dates
    arr[index].descTask = descTask
    User.updateOne({
        _id: id
    }, {
        todo: arr
    }, function (err, obj) {
        if (err) throw err;
    })
}
module.exports.editTodo = editTodo

async function detailTodo(id, idTodo, title, dates, descTask) {
    let users = await User.findOne({
        _id: id
    })
    let arr = users.todo
    let index = arr.finddetail(x => x._id == idTodo)
    arr[index].title = title
    arr[index].dueDate = dates
    arr[index].descTask = descTask
}
module.exports.detailTodo = detailTodo

async function deleteAllTodo(id) {
    let users = await User.findOne({
        _id: id
    })
    let arr = []
    // arr = arr.length = 0;
    User.updateOne({
        _id: id
    }, {
        todo: arr
    }, function (err, obj) {
        if (err) throw err;
    })
}
module.exports.deleteAllTodo = deleteAllTodo