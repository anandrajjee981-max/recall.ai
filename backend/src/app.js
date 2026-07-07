import express from 'express'
import cookie from 'cookie-parser'
import authrouter from './routes/auth.routes.js'
import queryrouter from './routes/query.routes.js'
const app = express()
import cors from 'cors'

app.use(cors({
    credentials: true,
    origin: [
        "http://localhost:5173"
        
        
    ]
}))
app.use(express.json())
app.use(cookie())



app.use("/api/auth",authrouter)
app.use("/api/query",queryrouter)





export default app

