import express from 'express'
import cors from 'cors' // Top par import clean rakho
import cookie from 'cookie-parser'
import authrouter from './routes/auth.routes.js'
import queryrouter from './routes/query.routes.js'

const app = express()


const allowedOrigins = [
  "http://localhost:5173",
  "https://recall-ai-ashen.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, postman or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS Blocking: Origin not explicitly mapped'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));


app.options('*', cors());

app.use(express.json())
app.use(cookie())

// 4. ROUTER DIRECTORIES
app.use("/api/auth", authrouter)
app.use("/api/query", queryrouter)

export default app