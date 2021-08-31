const express = require("express")
const path = require("path")

const app = express()

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/server/index.html"))
})
app.listen(4040, () => console.log("Loud and Clear on 4040"))

const port = process.env.PORT || 4040

app.listen(port, () => console.log(`Loud and clear on ${port}`))
