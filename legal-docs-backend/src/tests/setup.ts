import { beforeAll, afterAll, afterEach } from '@jest/globals';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/legal-docs-test');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

// afterEach(async () => {
//   const collections = await mongoose.connection.db.collections();
//   for (let collection of collections) {
//     await collection.deleteMany({});
//   }
// });
