const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const app = express()
const port = 8080
const corsOptions = {
  origin:'localhost:3000',
  AccessControlAllowOrigin: '*',
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  destination: function (req, file, cb) {
    cb(null, '../audio')
  },
})

const upload = multer({ storage })

app.use(cors(corsOptions))

app.get('/', async (req, res)=> {
  return res.send("server reached")
})

app.post('/', upload.any('file'), (req, res) => {
  res.send({ message: 'Successfully uploaded files' })
    console.log(req.file, req.body)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})
