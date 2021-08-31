const express = require("express")
const path = require("path")
const Rollbar = require("rollbar")

let rollbar = new Rollbar({
  accessToken: "33a820ca09cd454d8933c892edb4cff4",
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const students = []
const app = express()

app.use(rollbar.errorHandler())

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/server/index.html"))
  rollbar.info(
    "html file served like a good steak entree at an upscale restraunt"
  )
})
app.post("/api/student", (req, res) => {
  const { name } = req.body
  name = name.trim

  rollbar.log("Meme Lord Added to Hall of Fame", {
    author: "Aiden",
    type: "manual entry",
  })
  res.sendStatus(200).send(students)
})

app.listen(4040, () => console.log("Loud and Clear on 4040"))

const port = process.env.PORT || 4040

app.listen(port, () => console.log(`Loud and clear on ${port}`))
