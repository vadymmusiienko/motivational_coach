/*
  Warnings:

  - Added the required column `topic` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "topic" TEXT NOT NULL;
