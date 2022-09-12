const express = require("express")

const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;
const postRouter = require("./posts/posts.router").router;

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({message:"todo en orden!"})
})

app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/posts", postRouter)

app.listen(8000,() => {
    console.log("el server inicio en el puerto 8000")
})
