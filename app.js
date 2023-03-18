const express = require('express');
const app = express();
const port = 4444;
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const friendRoute = require('./routes/friend')
const messagesRoute = require('./routes/messages')

dotenv.config()

// MONGOOSE CONNECTION :
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB Successfully")
}).catch((err) => {
    console.log("Error in the DB Connection")
})
app.use(
    cors({
        origin: "http://127.0.0.1:5173",
    })
)

app.use(express.json());
app.use(helmet());
app.use(morgan("common"))

// MIDDLEWARES :

app.use("/api/users" , userRoute)
app.use("/api/auth" , authRoute)
app.use("/api/posts", postRoute)
app.use("/api/messages", messagesRoute)
app.use("/api/friend", friendRoute)




app.listen(port,()=>{
    console.log("Backend server is running at : http://localhost:" + port)
})