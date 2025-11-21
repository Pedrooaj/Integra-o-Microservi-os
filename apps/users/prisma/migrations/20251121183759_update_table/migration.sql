/*
  Warnings:

  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `urlPhoto` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "city",
DROP COLUMN "state",
DROP COLUMN "summary",
DROP COLUMN "urlPhoto",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1;
