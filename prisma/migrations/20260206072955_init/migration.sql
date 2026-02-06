-- CreateEnum
CREATE TYPE "IntrestedInSummerCamp" AS ENUM ('Yes', 'No');

-- CreateTable
CREATE TABLE "UserForm" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "parentName" TEXT NOT NULL,
    "parentEmail" TEXT,
    "parentPhone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "intrestedInSummerCamp" "IntrestedInSummerCamp" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserForm_pkey" PRIMARY KEY ("id")
);
