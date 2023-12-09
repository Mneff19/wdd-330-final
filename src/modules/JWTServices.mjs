import * as jose from 'jose';

export default class JWTServices {
    constructor() {
        this.alg = 'RS256';
        this.pkcs8 = `-----BEGIN PRIVATE KEY-----
        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
        -----END PRIVATE KEY-----`;
    }

    async creatJWT() {
        this.privateKey = await jose.importPKCS8(this.pkcs8, this.alg)

        this.token = await new jose.SignJWT({ myClaim: true })
          .setProtectedHeader({
            typ: 'JWT',
            alg: 'RS256',
          })
          .setExpirationTime('6h')
          .setIssuedAt()
          .sign(privateKey);
        console.log(token);
    }
}