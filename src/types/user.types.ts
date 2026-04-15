export interface User {
     id: string;
     name: string;
     email: string;
     image?: string | null;
     role: string;
     status: string;
     lastLoginAt?: string | Date;
     createdAt: string | Date;
     updatedAt: string | Date;
}
