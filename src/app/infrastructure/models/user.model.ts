import type { BasicStatus } from "../http/types/common.type"
import type { UserRole } from "../http/types/response/register-response"

export interface UserProfileDto {
  id: string
  fullName: string
  birthDate: Date
  city: string
  country: string
  avatarUrl: string | null
}

export interface UserDto {
  id: string
  name: string
  email: string
  status: BasicStatus
  role: UserRole
  createdAt: Date
  profile: UserProfileDto
}