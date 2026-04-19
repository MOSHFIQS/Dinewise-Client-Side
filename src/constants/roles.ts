// DineWise roles — matches server-side role strings exactly
export const Roles = {
     ADMIN: "ADMIN",
     CHEF: "CHEF",
     CUSTOMER: "CUSTOMER",
} as const

export type RoleType = keyof typeof Roles
