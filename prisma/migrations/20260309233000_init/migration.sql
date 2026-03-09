-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "LegalCategory" AS ENUM ('CRIMINAL_LAW', 'CIVIL_LAW', 'FAMILY_LAW', 'PROPERTY_LAW', 'CORPORATE_COMMERCIAL_LAW', 'LABOUR_LAW', 'CONSTITUTIONAL_WRIT', 'BANKING_CHEQUE_DISHONOUR', 'CYBER_CRIME', 'LEGAL_NOTICE', 'CONTRACT_AGREEMENT');

-- CreateEnum
CREATE TYPE "PromptType" AS ENUM ('DRAFTING', 'LEGAL_RESEARCH', 'CASE_SUMMARY', 'PETITION', 'WRITTEN_STATEMENT', 'BAIL_APPLICATION', 'LEGAL_NOTICE', 'AGREEMENT_DRAFT', 'CLIENT_INTERVIEW_QUESTIONS');

-- CreateEnum
CREATE TYPE "PromptTone" AS ENUM ('FORMAL', 'DETAILED', 'CONCISE');

-- CreateEnum
CREATE TYPE "PromptLanguage" AS ENUM ('ENGLISH', 'BANGLA', 'BILINGUAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromptHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "inputRequest" TEXT NOT NULL,
    "category" "LegalCategory" NOT NULL,
    "promptType" "PromptType" NOT NULL,
    "caseTitle" TEXT,
    "facts" TEXT,
    "relevantLaw" TEXT,
    "courtName" TEXT,
    "desiredLanguage" "PromptLanguage" NOT NULL DEFAULT 'ENGLISH',
    "inputLanguage" "PromptLanguage" NOT NULL DEFAULT 'ENGLISH',
    "tone" "PromptTone" NOT NULL DEFAULT 'FORMAL',
    "generatedPrompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromptHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoritePrompt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "promptHistoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoritePrompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromptTemplate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "LegalCategory" NOT NULL,
    "promptType" "PromptType" NOT NULL,
    "language" "PromptLanguage" NOT NULL DEFAULT 'ENGLISH',
    "promptBody" TEXT NOT NULL,
    "tags" TEXT[],
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromptTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "PromptHistory_userId_createdAt_idx" ON "PromptHistory"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "PromptHistory_category_promptType_idx" ON "PromptHistory"("category", "promptType");

-- CreateIndex
CREATE INDEX "FavoritePrompt_promptHistoryId_idx" ON "FavoritePrompt"("promptHistoryId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoritePrompt_userId_promptHistoryId_key" ON "FavoritePrompt"("userId", "promptHistoryId");

-- CreateIndex
CREATE UNIQUE INDEX "PromptTemplate_slug_key" ON "PromptTemplate"("slug");

-- CreateIndex
CREATE INDEX "PromptTemplate_category_promptType_idx" ON "PromptTemplate"("category", "promptType");

-- CreateIndex
CREATE INDEX "PromptTemplate_isFeatured_isPublished_idx" ON "PromptTemplate"("isFeatured", "isPublished");

-- AddForeignKey
ALTER TABLE "PromptHistory" ADD CONSTRAINT "PromptHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoritePrompt" ADD CONSTRAINT "FavoritePrompt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoritePrompt" ADD CONSTRAINT "FavoritePrompt_promptHistoryId_fkey" FOREIGN KEY ("promptHistoryId") REFERENCES "PromptHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
