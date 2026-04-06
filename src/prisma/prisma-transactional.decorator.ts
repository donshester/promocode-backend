import { PrismaService } from './prisma.service';
import { PrismaTransactionContextService } from './prisma-transaction-context.service';

export function PrismaTransactional(): MethodDecorator {
  return ((
    _target: unknown,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<
      (...args: unknown[]) => Promise<unknown>
    >,
  ) => {
    const original = descriptor.value;
    if (typeof original !== 'function') {
      throw new Error(
        `@PrismaTransactional: ${String(propertyKey)} is not a function`,
      );
    }

    descriptor.value = function (this: unknown, ...args: unknown[]) {
      if (PrismaTransactionContextService.getClient()) {
        return original.apply(this, args);
      }

      return PrismaTransactionContextService.run(() =>
        PrismaService.instance.wrapWithTransaction(
          () => original.apply(this, args),
          (client) => PrismaTransactionContextService.set(client),
        ),
      );
    };

    return descriptor;
  }) as MethodDecorator;
}
