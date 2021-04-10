import { SyncStatus } from '../enums/sync-status';
import { BaseModel } from './base-model';

export interface Portfolio extends BaseModel {
  userId: number;
  lastSyncAt: string | null;
  syncStatus: SyncStatus;
  portfolioAssets: PortfolioAsset[];
}

export interface PortfolioAsset extends BaseModel {
  coin: string;
  amount: number;
  averagePrice: number;
  totalInvested: number;
  portfolioId: number;
  currentPrice: number;
  unrealizedValue: number;
  totalValue: number;
  realizedPnLShort: number;
  realizedPnLLong: number;
  percentageOfPortfolio: number;
}