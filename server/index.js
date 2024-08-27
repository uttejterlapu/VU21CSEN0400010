const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors())

const productRoutes = require('./routes/productRoutes');

app.use(express.json());
app.use('/api', productRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
