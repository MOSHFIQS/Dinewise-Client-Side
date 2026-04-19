export interface User {
     id: string;
     name: string;
     email: string;
     phone?: string | null;
     image?: string | null;
     role: string;
     status: string;
     isEmailVerified: boolean;
     emailVerifiedAt?: string | Date | null;
     lastLoginAt?: string | Date | null;
     createdAt: string | Date;
     updatedAt: string | Date;
}
