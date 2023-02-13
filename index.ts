import { connect } from 'mongoose';
import express from 'express';



const PORT = 3000;
const MONGODB_URI =
  'mongodb+srv://ThisIsForSchool:lSaFPLvHIk2bPCCz@cluster0.mtqaf6e.mongodb.net/test?retryWrites=true&w=majority';

const app = express();



try {
  const mongoConnect = async () => {
    await connect(MONGODB_URI);
  };

  mongoConnect();

  app.use(express.json());

  app.listen(PORT, () => console.log(`listening on port ${PORT}`));

} catch (err) {
  console.error(err);
}
