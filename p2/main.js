let http = require("http")
const { get_books, get_a_book, post_a_book, put_a_book, delete_a_book } = require("./methods")


let server = http.createServer((req,res) => {
    let link_len = req.url.split("/")

    if(req.url == '/' && req.method == "GET") res.end("Hello")
    else if (req.url == "/books" && req.method == "GET") get_books(req, res)
    else if(req.url.startsWith('/books')) {
        if(req.method == "GET") get_a_book(req, res, link_len)
        else if(req.method == "POST") post_a_book(req, res)
        else if(req.method == "PUT") put_a_book(req, res, link_len)
        else if(req.method == "DELETE") delete_a_book(req, res, link_len)
    }
})

server.listen(8080, () => console.log("This server is running on http://localhost:8080"))