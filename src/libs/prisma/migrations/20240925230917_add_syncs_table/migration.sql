-- CreateTable
CREATE TABLE "syncs" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "info" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "syncs_pkey" PRIMARY KEY ("id")
);
