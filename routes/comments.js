const router = require('express').Router()
const Comments = require('../db/comments')

router.get('/', async (req, res, next) => {
    try{
        const comments = await Comments.findAll()
        const replyComments = comments.filter(c => c.isReplyTo !== null).map(c => c.dataValues)
        const notReplyComments = comments.filter(c => c.isReplyTo === null).map(c => c.dataValues)
        const replies = {}
        replyComments.forEach(c => {
            if (!replies[c.isReplyTo]){
                replies[c.isReplyTo] = [c]
            }
            else {
                replies[c.isReplyTo].push(c)
            }
        })
        const response = notReplyComments.map(c => {
            if (replies[c.id]){
                c.replies = replies[c.id]
            }
            return c
        })
        console.log(response)
        res.send(response)
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
        const comments = await Comments.create(req.body)
        // console.log(comments)
        res.status(200).send(comments)
    } catch(error){
        console.log(error)
    }
})



module.exports = router