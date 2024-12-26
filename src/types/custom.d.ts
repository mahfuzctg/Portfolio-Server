interface DecodedToken {
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken; // Extend the Request interface
    }
  }
}
