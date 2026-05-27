export interface GroupUser {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  role: string; // "OWNER", "ADMIN", "MEMBER"
}

export interface Group {
  id: string;
  name: string;
  users: GroupUser[];
}

export interface CreateGroupRequest {
  name: string;
  users?: { userId: string; role: string }[];
}

export interface UpdateGroupRequest {
  name?: string;
  users?: { userId: string; role: string }[];
}

export interface GeneratedInviteLink {
  inviteLink: string;
}