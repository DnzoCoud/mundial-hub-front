import { httpClient } from "../http/httpClient";
import type { LoginPayload } from "../http/types/login-payload.type";
import type { RegisterPayload } from "../http/types/register-payload.type";
import type { LoginResponse } from "../http/types/response/login-response";
import type { RegisterResponse } from "../http/types/response/register-response";
import { handleApiResponse } from "./api.handler";

export class AuthApi {
  static async login(payload: LoginPayload) {
    const response = await httpClient.post("/auth/login", payload)
    return handleApiResponse<LoginResponse>(
      response
    );
  }

  static async register(payload: RegisterPayload) {
    const response = await httpClient.post("/auth/register", payload)
    return handleApiResponse<RegisterResponse>(
      response
    );
  }
}