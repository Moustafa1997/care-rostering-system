export interface Group {
  _id: string;
  name: string;
  staffCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GroupStaff {
  _id: string;
  fullName: string;
  photo: string;
}

export interface GroupDetail {
  groupName: string;
  staff: GroupStaff[];
}

export interface AvailableStaff {
  _id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface CreateGroupRequest {
  name: string;
  staff: string[];
}

export interface GroupsApiResponse {
  success: boolean;
  message: string;
  data: {
    groups: Group[];
    page: number;
    pages: number;
    total: number;
  };
}

export interface GroupDetailApiResponse {
  success: boolean;
  message: string;
  data: GroupDetail;
}

export interface AvailableStaffApiResponse {
  success: boolean;
  message: string;
  data: AvailableStaff[];
}

export interface GroupFilters {
  search?: string;
}
