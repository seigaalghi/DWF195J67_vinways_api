const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const router = require('./src/routes');

app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/v1', router);

app.listen(PORT, () => console.log(`Express is running at port ${PORT}`));
