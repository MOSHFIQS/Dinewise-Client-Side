export const roles = {
    ADMIN: "ADMIN",
    CHEF: "CHEF",
    CUSTOMER: "CUSTOMER"
} as const;

export type RoleType = keyof typeof roles;
