-- CreateTable
CREATE TABLE "Comment" (
    "id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_key" ON "Comment"("id");
