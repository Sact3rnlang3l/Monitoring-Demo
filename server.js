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
app.use('/style', express.static('/public/styles.css'))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/server/index.html"))
  rollbar.info(
    "html file served like a good steak entree at an upscale restraunt"
  )
})
app.post("/api/student", (req, res) => {
  let { name } = req.body
  name = name.trim()

  const index = students.findIndex((studentName) => studentName === name)

  if (index === -1 && name !== "") {
    students.push(name)
    rollbar.log("Student added")
    res.status(200).send(students)
  } else if (name === "") {
      rollbar.error('no name given')
    res.status(400).send("must provide a name.")
  } else {
      rollbar.error('Student already exists')
    res.status(400).send("that student already exists")
  }
})

app.use(rollbar.errorHandler())

app.listen(4040, () => console.log("Loud and Clear on 4040"))

const port = process.env.PORT || 4040

app.listen(port, () => console.log(`Loud and clear on ${port}`))
