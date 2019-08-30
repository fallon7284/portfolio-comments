const db = require('./db/database')
const Comments = require('./db/comments')
const { green, red } = require('chalk')




const seedComments = [
    {userName: 'Brendan', userEmail: 'fallon7284@gmail.com', message: 'first!', isReplyTo: null},
    {userName: 'Brendan', userEmail: 'brendanc.fallon@gmail.com', message: 'I really hope this guy gets a great job soon!', isReplyTo: null},
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
