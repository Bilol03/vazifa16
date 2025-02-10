let fs = require('fs')
let path = require('path')


let datas = fs.readFileSync(path.join(__dirname, "data/data.json"), "utf-8")
datas = datas ? JSON.parse(datas) : []

function get_books(req, res) {
    res.writeHead(200, {"content-type": "application/json"})
    res.write(JSON.stringify(datas))
    res.end()
}

function get_a_book(req, res, link_len) {
    let data = datas.find(el => el.id == link_len[2])    
    res.writeHead(200, {'content-type': 'application/json'})
    data ? res.write(JSON.stringify(data)) : res.write("Ma'lumot topilmadi")
    res.end()
}
function post_a_book(req, res) {
    let data = ""
    res.writeHead(200, {'content-type': 'application/json'})

    req.on("data", chunk => {
        data += chunk
    })
    req.on('end', () => {
        data = JSON.parse(data)
        
        data.id = datas ? datas[datas.length - 1 ].id + 1 : 1
        datas.push(data)
        fs.writeFileSync(path.join(__dirname, "data/data.json"), JSON.stringify(datas, null, 4), 'utf-8')

        res.write(JSON.stringify({
            message: "Success",
            datas: datas
        }))
        res.end()
    })


}
function put_a_book(req, res, link_len) {
    let body = ""
    req.on("data", chunk => body += chunk)
    req.on('end', () => {
        body = JSON.parse(body)
        console.log(body);
        
        datas.map(el => {
            if(el.id === +link_len[2]){
                el.title = body.title ? body.title : el.title
                el.author = body.author ? body.author : el.author
                el.year = body.year ? +body.year: el.year
            }
        })
        
        fs.writeFileSync(path.join(__dirname, "data/data.json"), JSON.stringify(datas, null, 4), 'utf-8')

        res.writeHead(200, {"content-type": "application/json"})
        res.write(JSON.stringify({
            message: "Success",
            datas: datas
        }))

        res.end()
    })


}
function delete_a_book(req, res, link_len) {
    datas = datas.filter(el => el.id !== +link_len[2])
    fs.writeFileSync(path.join(__dirname, "data/data.json"), JSON.stringify(datas, null, 4), "utf-8")
    res.writeHead(200, {"content-type": "application/json"})
    res.write(JSON.stringify({
        message: "Success",
    }))
    res.end()
}

module.exports = {

    get_books, 
    get_a_book, 
    post_a_book, 
    put_a_book, 
    delete_a_book
}