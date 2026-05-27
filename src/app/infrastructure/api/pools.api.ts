import { httpClient } from "../http/httpClient";
import { handleApiResponse } from "./api.handler";
import type { PoolSummary, CreatePoolRequest, PoolResponse } from "../models/pool.model";

export const PoolsApi = {
  // Obtener todas las pollas del usuario
  getAll: async (): Promise<PoolSummary[]> => {
    const response = await httpClient.get("/pools");
    return handleApiResponse<PoolSummary[]>(response);
  },

  // Obtener una polla por ID
  getById: async (poolId: string): Promise<PoolSummary> => {
    const response = await httpClient.get(`/pools/${poolId}`);
    return handleApiResponse<PoolSummary>(response);
  },

  // Crear una polla dentro de un grupo
  create: async (groupId: string, data: CreatePoolRequest): Promise<PoolResponse> => {
    const response = await httpClient.post(`/pools/group/${groupId}`, data);
    return handleApiResponse<PoolResponse>(response);
  },
};