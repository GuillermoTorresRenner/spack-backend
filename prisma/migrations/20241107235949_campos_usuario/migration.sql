-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "nextPasswordChangeDate" SET DEFAULT now() + interval '2 months';
