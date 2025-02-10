let http = require("http")
const { get_tasks, get_a_task, post_a_taks, put_a_taks, delete_a_taks } = require("./methods")


let server = http.createServer((req,res) => {
    let link_len = req.url.split("/")

    if(req.url == '/' && req.method == "GET") res.end("Hello")
    else if (req.url == "/tasks" && req.method == "GET") get_tasks(req, res)
    else if(req.url.startsWith('/tasks')) {
        if(req.method == "GET") get_a_task(req, res, link_len)
        else if(req.method == "POST") post_a_taks(req, res)
        else if(req.method == "PUT") put_a_taks(req, res, link_len)
        else if(req.method == "DELETE") delete_a_taks(req, res, link_len)
    }
})

server.listen(8080, () => console.log("This server is running on http://localhost:8080"))