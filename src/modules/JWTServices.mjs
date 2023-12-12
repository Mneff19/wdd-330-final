import * as jose from 'jose';
// const { KeyObject } = require('node:crypto');
// const { subtle } = globalThis.crypto;

export default class JWTServices {
  async createJWT() {
    const { publicKey, privateKey } = await jose.generateKeyPair('RS256');

    const publicJwk = await jose.exportJWK(publicKey);
    const token = await new jose.SignJWT({ myClaim: true })
      .setProtectedHeader({
        typ: 'JWT',
        alg: 'RS256',
      })
      .setExpirationTime('6h')
      .setIssuedAt()
      .sign(privateKey);

    return [token, publicJwk];
  }

  async verifyJWT(jwtArr) {
    const parsedJwk = await jose.importJWK(jwtArr[1], 'RS256');
    const { payload } = await jose.jwtVerify(jwtArr[0], parsedJwk);
    return payload;
  }
}