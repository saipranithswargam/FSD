const { app } = require('./server.js')

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log('server started on port', PORT)
})