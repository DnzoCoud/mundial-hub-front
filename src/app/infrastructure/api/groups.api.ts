import { httpClient } from "../http/httpClient";
import { handleApiResponse } from "./api.handler";
import type { Group, CreateGroupRequest, UpdateGroupRequest, GeneratedInviteLink } from "../models/group.model";

export const GroupsApi = {
  // Obtener todos los grupos del usuario autenticado
  getAll: async (): Promise<Group[]> => {
    const response = await httpClient.get("/groups");
    return handleApiResponse<Group[]>(response);
  },

  // Obtener un grupo por ID
  getById: async (groupId: string): Promise<Group> => {
    const response = await httpClient.get(`/groups/${groupId}`);
    return handleApiResponse<Group>(response);
  },

  // Crear un nuevo grupo
  create: async (data: CreateGroupRequest): Promise<Group> => {
    const response = await httpClient.post("/groups", data);
    return handleApiResponse<Group>(response);
  },

  // Actualizar grupo (nombre o miembros)
  update: async (groupId: string, data: UpdateGroupRequest): Promise<Group> => {
    const response = await httpClient.patch(`/groups/${groupId}`, data);
    return handleApiResponse<Group>(response);
  },

  // Generar token de invitación
  generateInviteToken: async (groupId: string): Promise<GeneratedInviteLink> => {
    const response = await httpClient.post(`/groups/${groupId}/invite`);
    return handleApiResponse<GeneratedInviteLink>(response);
  },

  // Unirse a un grupo mediante token
  joinByToken: async (token: string): Promise<Group> => {
    const response = await httpClient.patch(`/groups/invite/${token}`);
    return handleApiResponse<Group>(response);
  },

  // Salir de un grupo (abandonar)
  leave: async (groupId: string): Promise<void> => {
    await httpClient.patch(`/groups/${groupId}/leave`);
  },

  // Eliminar grupo (solo owner)
  delete: async (groupId: string): Promise<void> => {
    await httpClient.delete(`/groups/${groupId}`);
  },
};