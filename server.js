const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const Datastore = require('nedb');
//create server
const app  = express();
const server = http.createServer(app)
//set up socket.io:
const io = new Server(server)
//Create the database:
const database = new Datastore('./database.db')
//Load the database:
database.loadDatabase()
//set up view engine
app.set("views", "./views");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
io.on('connection',(socket)=>{
    // console.log('Have a user connect');
    socket.on('result',(re)=>{
        database.insert(re)
        if(re.result == 'rickroll'){
            url = 'rickroll_url'
        }else{
            url = ''
        }
        socket.emit('url',url)
    })
})

app.get('/',(req,res)=>{
    res.render('troll')
})

server.listen(3000,()=>{
    console.log('Listening at 3000')
})
