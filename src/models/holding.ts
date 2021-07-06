import { BaseCoinModel } from './base-coin-model';
import { SideType } from '../enums/side-type';

export interface Holding extends BaseCoinModel {
  tradedAt: string;
  amount: number;
  purchasePrice: number;
  fees: number;
  side: SideType;
  isManuallyAdded: boolean;
  portfolioAssetId: number;
}
