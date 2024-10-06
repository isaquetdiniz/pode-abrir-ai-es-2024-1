"use client";

import { cn } from "@/libs/shadcn/utils";
import { type VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import * as React from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";

const headerVariants = cva(
  "flex justify-between items-center py-4 h-[80px] bg-orange-600 relative z-10"
);

const Navbar = React.forwardRef<
  React.ElementRef<"header">,
  React.ComponentPropsWithoutRef<"header"> & VariantProps<typeof headerVariants>
>(({ className, ...props }, ref) => (
  <header ref={ref} className={cn(headerVariants(), className)} {...props}>
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src="/images/logo_projeto.png"
          alt="Posso abrir aí?"
          width={192}
          height={72}
          className="w-[160px] sm:w-[192px] h-auto"
        />
      </div>
      <div className="flex items-center gap-6">
        <Image
          src="/images/logo_prefeitura.png"
          alt="Prefeitura do Recife"
          width={160}
          height={45}
          className="w-[140px] sm:w-[190px] h-auto"
        />
        <div className="flex items-center gap-2 text-white">
          <CgProfile className="text-2xl sm:text-4xl" />
          <p className="text-sm sm:text-base">Olá, PEDRO</p>
          <IoMdArrowDropdown className="text-xl sm:text-2xl" />
        </div>
      </div>
    </div>
  </header>
));

Navbar.displayName = "Navbar";

export default Navbar;
