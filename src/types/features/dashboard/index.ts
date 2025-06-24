import { RecentContract } from "../contractors";

export interface DashboardSummary {
  total: number;
  Active: number;
  Pending: number;
  Inactive: number;
}

export interface DashboardData {
  data: {
    summary: DashboardSummary;
    recentContracts: RecentContract[];
  };
}
