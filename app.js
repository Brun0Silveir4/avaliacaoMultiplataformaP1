const express = require('express')
const app = express()
const handlebars = require('express-handlebars').engine
const bodyParser = require('body-parser')
const post = require('./models/post')

app.engine("handlebars", handlebars({defautLayout: 'main'}))
app.set("view engine", "handlebars")


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())




app.get('/', (req, res) => {
    res.render('cadastro')
})


app.post('/cadastro', (req, res) => {
    post.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }).then(() => {
        res.render('cadastro')
    }).catch((e) => {
        console.log('erro ao cadastrar ' + e)
    })
})

app.get('/consulta', (req, res) => {
    post.findAll().then((post) => {
        res.render('consulta', {post})
    }).catch((e) => {
        console.log('erro ' + e)
    })
})

app.get("/editar/:id", function(req, res){
    post.findAll({
        where: {
            'id': req.params.id
        }}).then((post) => {
        res.render("editar", {post})
    }).catch((e) =>{
        console.log("Erro ao carregar dados do banco: " + e)
    })
})

app.post("/atualizar", (req, res) => {
    post.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    },{
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.redirect("/consulta")
    })
})

app.get("/excluir/:id", (req, res) => {
    post.destroy({
        where: {
            'id': req.params.id
        }}).then(() => {
        res.redirect("/")
    }).catch((e) => {
        console.log("Erro ao excluir: " + e)
    })
})


app.listen('8081', () => {
    console.log('servidor rodando na porta 8081')
})