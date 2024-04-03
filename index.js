const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const huffman = require('huffman-simple');

const arr = [...'Hello World'].map(char=>char.charCodeAt(0));
const encoded = huffman.encode(arr);
const decoded = huffman.decode(encoded);
const str = String.fromCharCode(...decoded);

console.log("Decoded: " + str)

app.use(express.static(__dirname + '/public/assets/image'));
app.use(express.static(__dirname + '/public/assets/video'));
app.use(express.static(__dirname + '/public/assets/audio'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/lib'));
app.use(express.static(__dirname + '/public/js'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
})

io.on('connection', (socket) => {
  console.log("New connection: " + socket.id);
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
