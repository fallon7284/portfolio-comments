const db = require('./db/database')
const Comments = require('./db/comments')
const { green, red } = require('chalk')




const seedComments = [
    {userName: 'Brendan', userEmail: 'fallon7284@gmail.com', message: 'first!', isReplyTo: null, replies: []},
    {userName: 'Not Brendan', userEmail: 'brendanc.fallon@gmail.com', message: 'Someone should hire this developer fast!', isReplyTo: null, replies: []},
    {userName: 'Someone other than Brendan', userEmail: 'brendanc.fallon@gmail.com', message: 'I agree. What a delightful user experience!', isReplyTo: 2, replies: []}
    ]



const seed = async () => {
    try {
        await db.sync({ force: true })
        await Comments.bulkCreate(seedComments)
    
    } catch (err) {
        console.log(red(err))
    }
  }

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
