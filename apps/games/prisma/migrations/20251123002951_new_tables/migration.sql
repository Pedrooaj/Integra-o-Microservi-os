-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "launchDate" TIMESTAMP(3) NOT NULL,
    "urlPicture" TEXT NOT NULL,
    "tags" TEXT[],
    "publisher" TEXT NOT NULL,
    "studio" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "commentsId" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_title_key" ON "Game"("title");
