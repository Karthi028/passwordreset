const { default: mongoose } = require("mongoose")
const app = require("./app")
const { PORT, MONGODB_URI } = require('./utils/config')

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("connected to Database")
        console.log("connecting to server")

        app.listen(3000, () => {
            console.log(`server runs on http://localhost:${PORT}`)
        })

    })
    .catch((err) => {
        console.log('error connecting to database', err.message)

    })

