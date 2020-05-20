const http = require('http')

const server = http.createServer((req, res) => {
    console.log('request received')
    // console.log(JSON.stringify(req))
    console.log(req.headers)
    res.setHeader('Centent-Type', 'text/html')
    res.setHeader('X-Foo', 'bar')
    res.writeHead(200, { 'Content-Type': 'text/plain', 'charset': 'utf-8' })
    res.end('ok')
})

server.listen(8088)
