export interface PoolSummary {
  id: string;
  name: string;
  description: string;
  code: string;
  maxMembers: number;
  isPrivate: boolean;
  status: string;
  totalPoints: number;
  membersCount: number;
}

export interface PoolDetail extends PoolSummary {
  // Podría incluir más campos si el backend lo permite, pero por ahora usamos PoolSummary
}

export interface CreatePoolRequest {
  name: string;
  description?: string;
  maxMembers?: number;
  isPrivate?: boolean;
  startsAt?: string;
  endsAt?: string;
}

export interface PoolResponse {
  id: string;
  name: string;
  description: string;
  code: string;
  maxMembers: number;
  isPrivate: boolean;
  status: string;
}