const http = require('http')

const server = http.createServer((req, res) => {
    console.log('request received')
    // console.log(JSON.stringify(req))
    console.log(req.headers)
    res.setHeader('Centent-Type', 'text/html')
    res.setHeader('X-Foo', 'bar')
    res.writeHead(200, { 'Content-Type': 'text/html', 'charset': 'utf-8' })
    
    res.write('<html maaa=a >');
    res.write('<head>');
    res.write('<style>');
    res.write('body div{')
    res.write('display:flex;')
    res.write('height:100px;')
    res.write('width: 200px;')
    res.write('}');
    res.write('body div #');
    res.write('item1{')
    res.write('width:20px;');
    res.write('height:60px;')
    res.write('background-color');
    res.write(':')
    res.write(' rgb( ');
    res.write('154,85,36);')
    res.write('}');
    res.write('body div #');
    res.write('item2{')
    res.write('width:30px;');
    res.write('height:60px;')
    res.write('background-color');
    res.write(':')
    res.write(' rgb(')
    res.write('0, 114, 85);')
    res.write('}');
    res.write('body div #');
    res.write('item3{')
    res.write('width:40px;');
    res.write('height:60px;')
    res.write('background-color');
    res.write(':')
    res.write(' rgb(')
    res.write('0, 11, 114);')
    res.write('}');
    res.write('body div #');
    res.write('item4{')
    res.write('width:50px;');
    res.write('height:60px;')
    res.write('background-color');
    res.write(':')
    res.write(' rgb(')
    res.write('114, 0, 114);')
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
    res.write('</span>');
    res.write('<span ');
    res.write(' id="item2"')
    res.write(' >')
    res.write('item2')
    res.write('</span>');
    res.write('<span ');
    res.write(' id="item3"')
    res.write(' >')
    res.write('item3')
    res.write('</span>');
    res.write('<span ');
    res.write(' id="item4"')
    res.write(' >')
    res.write('item4')
    res.write('</span>');
    res.write('</div>');
    res.write('</body>');
    res.write('</html>');
//     let html = 
//     '<html maaa=a >'+
//     '<head>'+
//         '<style>'+
//     'body div{'+
//         'display: flex'+
//     '}'+
//     'body div #item1{'+
//         'width:20px;'+
//         'background-color: #ff1111;'+
//     '}'+
//     'body div #item2{'+
//         'width:30px;'+
//         'background-color: #0ec5f3;'+
//     '}'+
//     'body div #item3{'+
//         'width:40px;'+
//         'background-color: #c42c89;'+
//     '}'+
//     'body div #item4{'+
//         'width:50px;'+
//         'background-color: #9eb922;'+
//     '}'+
//         '</style>'+
//     '</head>'+
//     '<body>'+
//         '<div class="container">'+
//             '<span id="item1">'+
//                 'span1'+
//             '</span>'+
//             '<span id="item2">'+
//                 'span2'+
//             '</span>'+
//             '<span id="item3">'+
//                 'span3'+
//             '</span>'+
//             '<span id="item4">'+
//                 'span4'+
//             '</span>'+
//         '</div>'+
//     '</body>'+
// '</html>'
    res.end();

})

server.listen(8088, '127.0.0.1', () => {
    console.log(`服务器运行在 http://127.0.0.1:8088/`);
  })

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