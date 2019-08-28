const router = require('express').Router()
const Comments = require('../db/comments')

router.get('/', async (req, res, next) => {
    try{
        const comments = await Comments.findAll()
        res.send(comments)
    } catch(error){
        console.log(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try{
        const comments = await Comments.destroy({where: {id: req.params.id}})
        res.send(comments)
    }catch(error){
        console.log(error)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const comments = await Comments.bulkCreate(req.body)
        res.status(200).send(comments)
    } catch(error){
        console.log(error)
    }
})



module.exports = router