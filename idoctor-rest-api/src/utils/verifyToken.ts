import { verify, Secret } from 'jsonwebtoken';

const verifyToken = (token: string, secretOrPublicKey: Secret) => verify(token, secretOrPublicKey);

export default verifyToken;
