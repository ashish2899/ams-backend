-- CreateEnum
CREATE TYPE "Role" AS ENUM ('stateUser', 'HQUser');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_map" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "profile_image_url" TEXT,
    "designation" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'stateUser',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
