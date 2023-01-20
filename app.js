import express from 'express'
import jwt from 'jsonwebtoken'


const key = "c0d3r"

const app = express()
const server = app.listen((8080), () => console.log("Server Up"))

const users = [{username: 'coder', password: '123', email: 'coder@coder.com'}]

app.use(express.json())
app.use(express.static('public'))

const authMiddleware = ((req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || authHeader === null) {
        return res.status(401).send({ error: "No autenticado" })
    }
    let token = authHeader
    jwt.verify(token, key, (error, decoded) => {
        if (error) return res.status(403).send({ error: "No autorizado" })
        req.user = decoded.user
    })
    next()
})

app.get('/currentUser', authMiddleware, (req, res) => {
    res.send(req.user)
})

app.post('/login', (req, res) => {
    let user = users.find(user => user.username === req.body.username)
    if (!user) return res.status(400).send({ error: "No existe este usuario"})
    if (user.password !== req.body.password) return res.status(400).send({ error: "Contraseña incorrecta" })
    const payload = {
        user: {
            username: user.username,
            email: user.email
        }
    }
    let token = jwt.sign(payload, key, {
        expiresIn: '24h'
    })
    res.send({ message: "logged in", token})
})