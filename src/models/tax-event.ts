import { BaseCoinModel } from './base-coin-model';
import { TaxEventType } from '../enums/tax-event-type';

export interface TaxEvent extends BaseCoinModel {
  taxedAt: string;
  type: TaxEventType;
  amount: number;
  salePrice: number;
  totalValue: number;
  spnl: number;
  lpnl: number;
  fees: number;
  portfolioAssetId: number;
  transactionId: number;
}
