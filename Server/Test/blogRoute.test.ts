import request from 'supertest';
import express from 'express';
import { ObjectId } from 'mongodb';
import { jest } from '@jest/globals';
import blogRouter from '../ContentRoute/blogRoute';

const app = express();
app.use(express.json());
app.use('/userBlog', blogRouter);

type Blog = {
  _id: ObjectId;
  name: string;
  title: string;
  content: string;
  author: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

// Declare the type of the mock function
const mockGetAllUserBlogs = jest.fn() as jest.MockedFunction<() => Promise<Blog[]>>;

mockGetAllUserBlogs.mockResolvedValue([{
  _id: new ObjectId(),
  name: 'Test Blog',
  title: 'Test Title',
  content: 'Test Content',
  author: 'Test Author',
  userId: 'Test UserId',
  createdAt: new Date(),
  updatedAt: new Date(),
}] as Blog[]);

jest.unstable_mockModule('../Template/blogTemplate', () => ({
  getAllUserBlogs: mockGetAllUserBlogs,
}));

describe('GET /userBlog', () => {
    it('should return all blogs', async () => {
      const res = await request(app).get('/userBlog');
      expect(res.status).toBe(200);
    });
  });