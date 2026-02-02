import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Producer service is running!');
});

app.listen(port, () => {
  console.log(`Producer service listening on port ${port}`);
});