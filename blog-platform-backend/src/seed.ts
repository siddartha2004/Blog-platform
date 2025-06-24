import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';
import { connectDB } from './config/db';

dotenv.config();

async function seed() {
  await connectDB(process.env.MONGO_URI!);

  const pwd = await bcrypt.hash('password', 10);

  const alice = await new User({ username: 'alice', password: pwd }).save();
  const bob = await new User({ username: 'bob', password: pwd }).save();

  const post1 = await new Post({ title: 'Hello World', content: 'My first post', author: alice._id }).save();
  const post2 = await new Post({ title: 'Second Post', content: 'Bob’s thoughts', author: bob._id }).save();

  await new Comment({ post: post1._id, author: bob._id, content: 'Nice post!' }).save();
  await new Comment({ post: post2._id, author: alice._id, content: 'Thanks for sharing.' }).save();

  console.log('✅ Seeder completed');
  process.exit(0);
}

seed().catch(err => console.error(err));
