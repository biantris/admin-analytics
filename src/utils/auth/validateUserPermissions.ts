type User = {
  roles: string[];
};

type ValidateUserPermissionsParams = {
  user: User;
  roles?: string[];
};

export const validateUserPermissions = ({
  user,
  roles,
}: ValidateUserPermissionsParams) => {
  if (roles) {
    if (roles?.length > 0) {
      const hasAllRoles = roles.every((role) => user.roles.includes(role));

      if (!hasAllRoles) return false;
    }
  }

  return true;
};
