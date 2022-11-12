/*
  Warnings:

  - The migration will change the primary key for the `Hashtag` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `in` on the `Hashtag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HashtagToPhoto" DROP CONSTRAINT "_HashtagToPhoto_A_fkey";

-- AlterTable
ALTER TABLE "Hashtag" DROP CONSTRAINT "Hashtag_pkey",
DROP COLUMN "in",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "_HashtagToPhoto" ADD FOREIGN KEY ("A") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
