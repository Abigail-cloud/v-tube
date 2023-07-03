import jwt, { Secret } from 'jsonwebtoken';


class JwtUtil {
  static signJwt(
    object: object,
    secret: Secret,
  ): string {
    return jwt.sign(object, secret, { algorithm: 'HS256' });
  }
}

export default JwtUtil;