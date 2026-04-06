import { AsyncLocalStorage } from 'async_hooks';
import type { Prisma } from '@prisma/client';

type Context = {
  transactionalClient?: Prisma.TransactionClient;
};

export class PrismaTransactionContextService {
  private static readonly als = new AsyncLocalStorage<Context>();

  public static run<T>(callback: () => Promise<T>): Promise<T> {
    return PrismaTransactionContextService.als.run({}, callback);
  }

  public static getClient(): Prisma.TransactionClient | undefined {
    return PrismaTransactionContextService.als.getStore()?.transactionalClient;
  }

  public static set(client: Prisma.TransactionClient | undefined): void {
    const store = PrismaTransactionContextService.als.getStore();
    if (!store) {
      throw new Error(
        'No CLS context: wrap the call with PrismaTransactionContextService.run()',
      );
    }
    store.transactionalClient = client;
  }
}
