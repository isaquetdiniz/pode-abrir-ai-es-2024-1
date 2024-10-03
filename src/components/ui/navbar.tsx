"use client";

import { cn } from "@/libs/shadcn/utils";
import { type VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import * as React from "react";
import { CgProfile } from "react-icons/cg";
import { FaSignInAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const headerVariants = cva(
  "flex justify-between items-center py-4 h-[80px] bg-orange-600 relative z-10"
);

const Navbar = React.forwardRef<
  React.ElementRef<"header">,
  React.ComponentPropsWithoutRef<"header"> & VariantProps<typeof headerVariants>
>(({ className, ...props }, ref) => (
  <header ref={ref} className={cn(headerVariants(), className)} {...props}>
    <div className="flex items-center ml-36">
      <Image
        src="/images/logo_projeto.png"
        alt="Posso abrir aí?"
        width={192}
        height={72}
      />
    </div>
    <div className="flex items-center gap-12 mr-36">
      <Image
        src="/images/logo_prefeitura.png"
        alt="Prefeitura do Recife"
        width={190}
        height={55}
      />
      <div className="flex items-center gap-2 text-white">
        <CgProfile className="text-4xl" />
        <p>Olá, PEDRO</p>
        <IoMdArrowDropdown className="text-2xl" />
      </div>
    </div>
  </header>
));

Navbar.displayName = "Navbar";

export default Navbar;
