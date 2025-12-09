/*
  Warnings:

  - You are about to drop the column `comments` on the `Carelog` table. All the data in the column will be lost.
  - You are about to drop the column `logDate` on the `Carelog` table. All the data in the column will be lost.
  - You are about to drop the column `plantId` on the `Carelog` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Carelog` table. All the data in the column will be lost.
  - Added the required column `plantOwnerId` to the `Carelog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Carelog` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."StatusType" AS ENUM ('ACTIVE', 'SICK', 'DEAD', 'ARCHIVED');

-- DropForeignKey
ALTER TABLE "public"."Carelog" DROP CONSTRAINT "Carelog_plantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Carelog" DROP CONSTRAINT "Carelog_userId_fkey";

-- DropIndex
DROP INDEX "public"."Carelog_userId_plantId_idx";

-- AlterTable
ALTER TABLE "public"."Carelog" DROP COLUMN "comments",
DROP COLUMN "logDate",
DROP COLUMN "plantId",
DROP COLUMN "userId",
ADD COLUMN     "amount" DOUBLE PRECISION,
ADD COLUMN     "careDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "plantOwnerId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "public"."PlantOwner" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "status" "public"."StatusType" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userPhotos" JSONB,
    "notes" TEXT[],
    "location" TEXT,
    "remindMeFlag" BOOLEAN NOT NULL,

    CONSTRAINT "PlantOwner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Carelog_plantOwnerId_idx" ON "public"."Carelog"("plantOwnerId");

-- AddForeignKey
ALTER TABLE "public"."PlantOwner" ADD CONSTRAINT "PlantOwner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlantOwner" ADD CONSTRAINT "PlantOwner_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Carelog" ADD CONSTRAINT "Carelog_plantOwnerId_fkey" FOREIGN KEY ("plantOwnerId") REFERENCES "public"."PlantOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
