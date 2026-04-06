import { Prisma } from '@prisma/client';

export function isUniqueConstraintViolation(e: unknown): boolean {
  return (
    e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
  );
}

export function isRecordNotFound(e: unknown): boolean {
  return (
    e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025'
  );
}
