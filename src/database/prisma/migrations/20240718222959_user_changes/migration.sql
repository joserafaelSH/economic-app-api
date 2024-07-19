/*
  Warnings:

  - A unique constraint covering the columns `[external_id]` on the table `USERS` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "USERS" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "USERS_external_id_key" ON "USERS"("external_id");
