import { User } from '../../context/AuthContext';

export const validateUserPermissions = (user: User) => {
  try {
    const { access_level } = user;

    if (access_level !== 'ADMIN') return false;

    return true;
  } catch (err) {
    return false;
  }
};
