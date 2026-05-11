import type { BasicStatus } from "../common.type"

export type UserRole = "FAN" | "OPERATOR" | "SUPPORT" | "COMPLIANCE" | "ADMIN"

export interface RegisterResponse {
  id: string
  name: string
  profile: null
  role: UserRole
  status: BasicStatus
}