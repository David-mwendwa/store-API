require('dotenv').config()
// async errors

const express = require('express')
const app = express();

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API<a href="/api/v1/products">products route</a></h1>')
})

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

// products route
app.use(notFoundMiddleware);
app.use(errorMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()