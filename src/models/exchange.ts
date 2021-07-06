import { BaseModel } from './base-model';
import { ExchangeName } from '../enums/exchange-name';
import { SyncStatus } from '../enums/sync-status';

export interface Exchange extends BaseModel {
  name: ExchangeName;
  apiKey: string;
  apiSecret: string;
  apiThird?: string;
  syncStatus?: SyncStatus;
  lastSyncAt?: string;
}