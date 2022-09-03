require('dotenv').config()

const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.get('/', (req, res) => {
    res.json({msg: 'welcome to the app'})
})


app.listen(process.env.PORT, () => console.log(`listening to port ${process.env.PORT}`))