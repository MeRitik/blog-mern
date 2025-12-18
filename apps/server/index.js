import express from "express";


const app = express()
const PORT = process.env.PORT || 8080

app.get("/api/health", (req, res) => {
    res.json({ status: "OK" })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
