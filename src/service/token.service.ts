import { envVars } from "@/config/env"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export interface SessionUser {
     id: string
     email: string
     role: string
     name?: string
}

export const sessionService = {
     getUserFromToken: async (): Promise<SessionUser | null> => {
          const cookieStore = await cookies()
          const token = cookieStore.get("token")?.value

          if (!token) return null

          try {
               return jwt.verify(token, envVars.JWT_SECRET) as SessionUser
          } catch (err) {
               console.log("JWT invalid or expired:", err)
               return null
          }
     },
}
