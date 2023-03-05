import { v4 as uuid } from 'uuid';

type SigInRequestData = {
  email: string;
  password: string;
};

const delay = (amount = 700) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export const signInRequest = async (data: SigInRequestData) => {
  await delay();

  return {
    token: uuid(),
    user: {
      name: 'Beatriz Oliveira',
      email: 'anabeatrizxoliveira@gmail.com',
      avatar_url: 'https://github.com/biantris.png',
    },
  };
};

export const recoverUserInformation = async () => {
  await delay();

  return {
    user: {
      name: 'Beatriz Oliveira',
      email: 'anabeatrizxoliveira@gmail.com',
      avatar_url: 'https://github.com/biantris.png',
    },
  };
};
