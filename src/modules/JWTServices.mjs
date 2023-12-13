import * as jose from 'jose';
// const { KeyObject } = require('node:crypto');
// const { subtle } = globalThis.crypto;

export default class JWTServices {
  async createJWT(customPropsObj) {
    const { publicKey, privateKey } = await jose.generateKeyPair('RS256');
    const publicJwk = await jose.exportJWK(publicKey);

    const token = await new jose.SignJWT(customPropsObj)
      .setProtectedHeader({
        typ: 'JWT',
        alg: 'RS256',
      })
      .setExpirationTime('15s')
      .setIssuedAt()
      .sign(privateKey);

    return JSON.stringify([token, publicJwk]);
  }

  async verifyJWT(jwtJSON) {
    const jwtArr = JSON.parse(jwtJSON);
    const parsedJwk = await jose.importJWK(jwtArr[1], 'RS256');
    const { payload } = await jose.jwtVerify(jwtArr[0], parsedJwk);
    return payload;
  }
}