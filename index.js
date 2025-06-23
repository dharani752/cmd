const http=require('http')

const server=http.createServer((req,res)=>{
    const path = req.url;
    if(path=='/' && req.method==='GET'){
        res.writeHead(200,{'content-type':'text/plain'})
        res.end("This is home")

    }
    else if(path=='/about' && req.method==='GET'){
    res.writeHead(200,{'content-type':'text/html'})
    res.end("<h1>Hello about</h1>")
    }
    else if(path=='/submit' && req.method==='POST'){
        let body='';
        req.on('data',(chunk)=>{
            body=body+chunk.toString()


        })
        req.on('end', () => {
        console.log("Received POST data:", body);
         const parsedData = JSON.parse(body);  // Safely parse JSON
            console.log("Parsed JSON:", parsedData);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Data received', data: parsedData }));
    }) 
    
}
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }

    
})

server.listen(3000,()=>{
    console.log("Running on port 3000")
})