const express = require('express');
const { resolve } = require('path');
const app = express();
console.log('Chegou no Express')
app.use(
    '/',
    express.static(
        resolve(
            __dirname,
            './build'
        )
    )
);

app.set('port', process.env.PORT || 3000, (err)=>{
if(err) {return console.log(err + 'deu algo errado')}
    console.log('Tudo OK')
});
 
