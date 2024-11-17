/*
  Warnings:

  - The primary key for the `Coach` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Coach` table. All the data in the column will be lost.
  - You are about to drop the column `coachId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_coachId_fkey";

-- DropIndex
DROP INDEX "Coach_voiceId_key";

-- AlterTable
ALTER TABLE "Coach" DROP CONSTRAINT "Coach_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Coach_pkey" PRIMARY KEY ("voiceId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "coachId",
ADD COLUMN     "coachVoiceId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_coachVoiceId_fkey" FOREIGN KEY ("coachVoiceId") REFERENCES "Coach"("voiceId") ON DELETE SET NULL ON UPDATE CASCADE;
