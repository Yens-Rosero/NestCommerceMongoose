// Define available roles in the system
export enum Role {
  CUSTOMER = 'customer',
  SELLER = 'seller',
  SUPERVISOR = 'supervisor',
  ADMIN = 'admin',
}

// Define hierarchy levels for each role
// Higher number means higher privileges
export const ROLE_HIERARCHY = {
  [Role.CUSTOMER]: 0,
  [Role.SELLER]: 1,
  [Role.SUPERVISOR]: 2,
  [Role.ADMIN]: 3,
};
