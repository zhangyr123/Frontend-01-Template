const http = require('http')

const server = http.createServer((req, res) => {
    console.log('request received')
    // console.log(JSON.stringify(req))
    console.log(req.headers)
    res.setHeader('Centent-Type', 'text/html')
    res.setHeader('X-Foo', 'bar')
    res.writeHead(200, { 'Content-Type': 'text/plain', 'charset': 'utf-8' })
    
    res.write('<html maaa=a >');
    res.write('<head>');
    res.write('<style>');
    res.write('body div{')
    res.write('display:flex;')
    res.write('}');
    res.write('body div #');
    res.write('item1{')
    res.write('width:20px;');
    res.write('background-color');
    res.write(':')
    res.write(' #ff1111;')
    res.write('}');
    res.write('body div #');
    res.write('item2{')
    res.write('width:30px;');
    res.write('background-color');
    res.write(':')
    res.write(' #0ec5f3;')
    res.write('}');
    res.write('body div #');
    res.write('item3{')
    res.write('width:40px;');
    res.write('background-color');
    res.write(':')
    res.write(' #c42c89;')
    res.write('}');
    res.write('body div #');
    res.write('item4{')
    res.write('width:50px;');
    res.write('background-color');
    res.write(':')
    res.write(' #9eb922;')
    res.write('}');
    res.write('</style>');
    res.write('</head>');
    res.write('<body>');
    res.write('<div ');
    res.write(' id="container"')
    res.write(' >')
    res.write('<span ');
    res.write(' id="item1"')
    res.write(' >')
    res.write('item1')
    res.write('</ span>');
    res.write('<span ');
    res.write(' id="item2"')
    res.write(' >')
    res.write('item2')
    res.write('</ span>');
    res.write('</div>');
    res.write('</body>');
    res.write('</html>');
    res.end();

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