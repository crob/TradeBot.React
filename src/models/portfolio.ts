import { SyncStatus } from '../enums/sync-status';

export interface Portfolio {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  lastSyncAt: string | null;
  syncStatus: SyncStatus;
  portfolioAssets: PortfolioAsset[];
}

export interface PortfolioAsset {
  id: number;
  createdAt: string;
  updatedAt: string;
  coin: string;
  amount: number;
  averagePrice: number;
  total: number;
  portfolioId: number;
  currentPrice: number;
  unrealizedValue: number;
  totalValue: number;
}