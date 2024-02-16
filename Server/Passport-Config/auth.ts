import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Middleware to authenticate routes based on JWT
function authenticateJWT(req: any, res: express.Response, next: () => void) {
  const token = req.cookies.token; // Get the JWT from the cookies

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
      if (err) {
          return res.status(403).json({ message: 'Forbidden' });
      }
      // Set the user ID in the request object
      req.user = user._id;
      next();
    });
  } else {
      return res.status(401).json({ message: 'Unauthorized' });
  }
};


export default authenticateJWT;