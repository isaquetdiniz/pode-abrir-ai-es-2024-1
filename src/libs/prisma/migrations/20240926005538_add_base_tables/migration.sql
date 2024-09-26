-- CreateTable
CREATE TABLE "groups" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "cnaes" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "group_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cnaes_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "neighborhoods" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "neighborhoods_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "streets" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "neighborhood_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "streets_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "cnaes" ADD CONSTRAINT "cnaes_group_code_fkey" FOREIGN KEY ("group_code") REFERENCES "groups"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "streets" ADD CONSTRAINT "streets_neighborhood_code_fkey" FOREIGN KEY ("neighborhood_code") REFERENCES "neighborhoods"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
