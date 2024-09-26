-- CreateTable
CREATE TABLE "companies" (
    "cnpj" TEXT NOT NULL,
    "social_reason" TEXT NOT NULL,
    "fantasy_name" TEXT NOT NULL,
    "situation" TEXT NOT NULL,
    "open_date" TIMESTAMP(3) NOT NULL,
    "close_date" TIMESTAMP(3),
    "bother" BOOLEAN NOT NULL,
    "number" TEXT,
    "batchNumber" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "street_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("cnpj")
);

-- CreateTable
CREATE TABLE "companies_cnaes" (
    "mainActivity" BOOLEAN NOT NULL,
    "predominantActivity" BOOLEAN NOT NULL,
    "sanitaryActivity" BOOLEAN NOT NULL,
    "company_cnpj" TEXT NOT NULL,
    "cnae_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_cnaes_pkey" PRIMARY KEY ("company_cnpj","cnae_code")
);

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_street_code_fkey" FOREIGN KEY ("street_code") REFERENCES "streets"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies_cnaes" ADD CONSTRAINT "companies_cnaes_company_cnpj_fkey" FOREIGN KEY ("company_cnpj") REFERENCES "companies"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies_cnaes" ADD CONSTRAINT "companies_cnaes_cnae_code_fkey" FOREIGN KEY ("cnae_code") REFERENCES "cnaes"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
