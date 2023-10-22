const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const bodyParser = require("express");
const app = express()
const port = 8080
const corsOptions = {
  origin:'localhost:3000',
  AccessControlAllowOrigin: '*',
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}

function transcribe(filename, destination){
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn('python',["C:\\projects\\transcribe\\transcribe.py", arg1, arg2, ...]);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
}

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  destination: function (req, file, cb) {
    cb(null, 'C:\\projects\\listening-search\\audio')
  },
})

const upload = multer({ storage: storage })

app.use(cors(corsOptions))

app.get('/', async (req, res)=> {
  return res.send("server reached")
})

app.post('/', upload.single('file'), (req, res) => {

  res.send({ message: 'Successfully uploaded files' })

    console.log(req.file)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})
