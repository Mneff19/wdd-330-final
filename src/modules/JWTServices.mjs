import * as jose from 'jose';
// const { KeyObject } = require('node:crypto');
// const { subtle } = globalThis.crypto;

export default class JWTServices {
    constructor() {
        this.token,
        this.publicJwk;

        this.createJWT();
    }

    async createJWT() {
      const { publicKey, privateKey } = await jose.generateKeyPair('RS256');
    
      this.publicJwk = await jose.exportJWK(publicKey);
      this.token = await new jose.SignJWT({ myClaim: true })
        .setProtectedHeader({
          typ: 'JWT',
          alg: 'RS256',
        })
        .setExpirationTime('6h')
        .setIssuedAt()
        .sign(privateKey);


        this.verifyJWT();
    }

    async verifyJWT() {
        const parsedJwk = await jose.importJWK(this.publicJwk, 'RS256');
        const { payload } = await jose.jwtVerify(this.token, parsedJwk);
        return payload;
    }
}