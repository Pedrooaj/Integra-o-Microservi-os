/*
  Warnings:

  - Changed the type of `gameId` on the `Comment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "gameId",
ADD COLUMN     "gameId" BIGINT NOT NULL;

-- CreateIndex
CREATE INDEX "Comment_gameId_idx" ON "Comment"("gameId");
