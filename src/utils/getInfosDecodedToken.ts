import jwt_decode from 'jwt-decode';

type Base64String = string;

const unbase64 = (i: Base64String): string =>
  Buffer.from(i, 'base64').toString('utf8');

interface IDecoded {
  user: string;
}

export const getInfosDecodedToken = async (token: string) => {
  const decoded: IDecoded = jwt_decode(unbase64(token));

  return decoded.user;
};
