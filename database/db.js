const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
});

connection.connect((error)=>{
    if(error){
        console.log('The connection error: ' + error);
        return
    }
    console.log('Connected BD MySQL')
});

module.exports = connection;