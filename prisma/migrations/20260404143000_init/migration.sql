-- CreateTable
CREATE TABLE "promocodes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount_percent" INTEGER NOT NULL,
    "activation_limit" INTEGER NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promocodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activations" (
    "id" TEXT NOT NULL,
    "promocode_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "promocodes_code_key" ON "promocodes"("code");

-- CreateIndex
CREATE INDEX "activations_email_idx" ON "activations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "activations_promocode_id_email_key" ON "activations"("promocode_id", "email");

-- AddForeignKey
ALTER TABLE "activations" ADD CONSTRAINT "activations_promocode_id_fkey" FOREIGN KEY ("promocode_id") REFERENCES "promocodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
