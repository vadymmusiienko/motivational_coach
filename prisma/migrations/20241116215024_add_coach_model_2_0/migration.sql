/*
  Warnings:

  - A unique constraint covering the columns `[voiceId]` on the table `Coach` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Coach_voiceId_key" ON "Coach"("voiceId");
