const express = require('express')
const app = express()
const router = require('./Routes/auth.routes')
const database = require("./config/database")
const cors = require('cors')


app.use(express.json())

database()


app.use(cors())
app.use('/api/v1', router)


app.listen(5000, () => {
    console.log('Listening on port 5000')
})
