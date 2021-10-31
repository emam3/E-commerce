const app = require('./src/app')

app.listen(process.env.PORT, () => { `on ${process.env.PORT}` })