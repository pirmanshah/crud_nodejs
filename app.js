const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

app.set('view engine', 'ejs')
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const router = require('./routes/index.routes');

app.use(router);

app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page Not Found',
    });
})

app.listen(port, () => {
    console.log(`🚀 server running on port: ${port}`);
});