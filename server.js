const express = require("express");
const app = express()
const bp = require("body-parser")
const qr = require("qrcode")


const port = 3000;

app.set("view engine", "ejs")

app.use(bp.urlencoded({extended : true }))
app.use(bp.json())


app.get("/", (req,res) => {
    res.render("authenticate")
    res.send('hello')
})
app.get("/create-qr-code", (req,res) => {
    res.render("index")
})
app.post("/create-qr-code", (req,res) => {
    var name = req.body.name
    var password = req.body.pwd 
    if (name === "Tejas" && password === "desostesos") {
        res.render("index")
    }else if(name === "12345" && password === "abc") {
        res.render("index")
    }else {
        res.render("error")
    }
})

app.listen(port, "192.168.1.34", () => console.log(`listening on port ${port}`))


app.post("/scan", (req, res) => {
const url = req.body.url
if(url.length === 0) res.send("Empty Data")
qr.toDataURL(url, (err,src) => {
    if(err) throw err
    res.render("scan", {src})
})
})
