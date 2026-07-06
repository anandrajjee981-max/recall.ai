import express from 'express'
import cookie from 'cookie-parser'
import authrouter from './routes/auth.routes.js'
const app = express()
app.use(express.json())
app.use(cookie())



app.use("/api/auth",authrouter)






export default app

