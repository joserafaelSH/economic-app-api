-- CreateTable
CREATE TABLE "USERS" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "monthly_budget" DOUBLE PRECISION NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "avatar" TEXT NOT NULL,
    "external_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "USERS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EXPENSES" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "EXPENSES_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USERS_email_key" ON "USERS"("email");

-- AddForeignKey
ALTER TABLE "EXPENSES" ADD CONSTRAINT "EXPENSES_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
