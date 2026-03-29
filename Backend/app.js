const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()
const databaseConfig = require('./config/db')
const connectcloundinary = require('./config/cloundiary')

const authRouter = require('./routes/authRoutes')
const categoryRouter = require('./routes/categoryRoutes')
const menuRouter  = require('./routes/menuRoutes')
const cartRouter = require('./routes/cartRoutes')
const orderRouter = require('./routes/orderRoutes')
const bookingRouter = require('./routes/bookingRoutes')


const app = express()


//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())

const PORT = process.env.PORT || 5000

app.use('/api/auth', authRouter)
app.use('/api/category',categoryRouter)
app.use('/api/menu',menuRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/booking',bookingRouter)

//database connect
databaseConfig()
connectcloundinary()

app.get('/', (req,res) => {
    res.send("Hello world!")
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})