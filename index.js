const app = require('./src/app');
const mongoDB = require('./src/helpers/mongodb')

const port = process.env.PORT || 5000;

mongoDB.connect()

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

