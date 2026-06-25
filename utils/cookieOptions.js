export const COOKIE_NAME = 'token';

export const cookieOptions = {
  httpOnly: true, 
  secure: true, 
  sameSite: 'none',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};
