import type { UserDto } from "@app/app/infrastructure/models/user.model";

export interface LoginResponse {
  token: string,
  tokenType: string,
  expiresIn: number,
  user: UserDto
}