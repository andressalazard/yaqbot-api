/*
  Warnings:

  - You are about to drop the `Posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."GardenerLevel" AS ENUM ('AMATEUR', 'INTERMEDIATE', 'PRO');

-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('PLANT', 'FERTILIZER', 'FLOWERPOT', 'TOOL', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."WateringMode" AS ENUM ('HIGH', 'MODERATE', 'LOW');

-- CreateEnum
CREATE TYPE "public"."LightType" AS ENUM ('FULL_SUNLIGHT', 'PARTIAL_LIGHT', 'INDIRECT_SUNLIGHT', 'DAPPLED_LIGHT', 'SHADE');

-- CreateEnum
CREATE TYPE "public"."Weather" AS ENUM ('CLEAR', 'CLOUDY', 'PARTIALLY_CLOUDLY', 'OVERCAST', 'GLOOMY', 'BRIGHT', 'DARK', 'FOGGY', 'MISTY', 'HAZY', 'DAMP');

-- CreateEnum
CREATE TYPE "public"."CareType" AS ENUM ('WATERING', 'PRUNING', 'FERTILIZING', 'CLEANING', 'TRANSPLANT');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PLACED', 'CONFIRMED', 'PROCESSING', 'DELIVERED');

-- DropForeignKey
ALTER TABLE "public"."Posts" DROP CONSTRAINT "Posts_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "public"."Posts";

-- DropTable
DROP TABLE "public"."Profile";

-- CreateTable
CREATE TABLE "public"."UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullname" TEXT,
    "phone" TEXT,
    "region" TEXT,
    "address" TEXT,
    "birthday" TIMESTAMP(3),
    "gender" "public"."Gender",
    "avatar" TEXT,
    "bio" TEXT,
    "gardernerLevel" "public"."GardenerLevel" NOT NULL DEFAULT 'AMATEUR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SocialLinks" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "username" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialLinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Post" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "title" VARCHAR(100),
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "category" "public"."Category" NOT NULL,
    "image" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Plant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "maxHeight" INTEGER,
    "wateringMode" "public"."WateringMode" NOT NULL DEFAULT 'LOW',
    "wateringFrequency" INTEGER,
    "weather" "public"."Weather"[],
    "light" "public"."LightType" NOT NULL,
    "specialCares" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Carelog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "careType" "public"."CareType" NOT NULL,
    "logDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comments" TEXT,

    CONSTRAINT "Carelog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "status" "public"."OrderStatus" NOT NULL,
    "deliveryAddress" TEXT,
    "total" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "public"."OrderDetails" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "units" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderDetails_pkey" PRIMARY KEY ("orderId","productId")
);

-- CreateTable
CREATE TABLE "public"."ShoppingCart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "public"."ShoppingItems" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,

    CONSTRAINT "ShoppingItems_pkey" PRIMARY KEY ("productId","cartId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "public"."UserProfile"("userId");

-- CreateIndex
CREATE INDEX "Carelog_userId_plantId_idx" ON "public"."Carelog"("userId", "plantId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "public"."Order"("id");

-- CreateIndex
CREATE INDEX "OrderDetails_orderId_productId_idx" ON "public"."OrderDetails"("orderId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingCart_id_key" ON "public"."ShoppingCart"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingCart_userId_key" ON "public"."ShoppingCart"("userId");

-- CreateIndex
CREATE INDEX "ShoppingItems_productId_cartId_idx" ON "public"."ShoppingItems"("productId", "cartId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- AddForeignKey
ALTER TABLE "public"."UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SocialLinks" ADD CONSTRAINT "SocialLinks_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Plant" ADD CONSTRAINT "Plant_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Carelog" ADD CONSTRAINT "Carelog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Carelog" ADD CONSTRAINT "Carelog_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderDetails" ADD CONSTRAINT "OrderDetails_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderDetails" ADD CONSTRAINT "OrderDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShoppingCart" ADD CONSTRAINT "ShoppingCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShoppingItems" ADD CONSTRAINT "ShoppingItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShoppingItems" ADD CONSTRAINT "ShoppingItems_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "public"."ShoppingCart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
