const { defineConfig } = require("cypress");
const { Pool } = require('pg')

module.exports = defineConfig({
  e2e: {
    "baseUrl": "http://localhost:3000",
    "viewportWidth": 1440,
    "viewportHeight": 900,
    setupNodeEvents(on, config) {
      // implement node event listeners here

      const pool = new Pool({
        host: 'queenie.db.elephantsql.com',
        user: 'alrygpqm',
        password: 'x6edFo8YUXG_TSjAd35wA0KpHkZ0dJEw',
        database: 'alrygpqm',
        port: 5432
      })

      on('task', {
        removeUser(email) {
          return new Promise(function(resolve){
            pool.query('DELETE FROM public.users WHERE email = $1', [email], function(error, result){
              if (error){
                throw error
              }
              resolve ({success: result})
            })
          })
         
        }
      })
    },
    
  },
  
});

