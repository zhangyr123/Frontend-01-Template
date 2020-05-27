const http = require('http')

const server = http.createServer((req, res) => {
    console.log('request received')
    // console.log(JSON.stringify(req))
    console.log(req.headers)
    res.setHeader('Centent-Type', 'text/html')
    res.setHeader('X-Foo', 'bar')
    res.writeHead(200, { 'Content-Type': 'text/plain', 'charset': 'utf-8' })
    res.end(`<html maaa=a >
    <head>
        <style>
    body div #myid{
        width:100px;
        background-color: #ff5000;
    }
    body div img{
        width:30px;
        background-color: #ff1111;
    }
        </style>
    </head>
    <body>
        <div>
            <img id="myid"/>
            <img />
        </div>
    </body>
    </html>
    `)
})

server.listen(8088)

// var express = require('express')
// var app = express()

// // app.use('/public', express.static('public'))

// app.get('/', function (req, res) {
//     res.render('./index.html');
// })

// var server = app.listen(8088, "127.0.0.1", function() {
//     console.log(server.address())
//     var host = server.address().address
//     var port = server.address().port
//     console.log("应用实例，访问地址为 http://%s:%s", host, port)
// })