import express from 'express';

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Consumer service is running!');
});

app.listen(port, () => {
  console.log(`Consumer service listening on port ${port}`);
});