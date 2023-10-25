import express from 'express'
import path from 'path'
import cors from 'cors'
const dotenv = require('dotenv').config()
import { errorHandler } from './middleware/errorMiddleware'
import {connectDB} from './config/db'

const port = process.env.PORT || 8080

connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    })
}

app.use(errorHandler)

app.listen(port, () => console.log("hello")) 