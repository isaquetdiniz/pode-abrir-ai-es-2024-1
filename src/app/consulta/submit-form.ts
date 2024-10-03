"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export async function onSubmit(params: {
	neighborhood: string;
	group: string;
}) {
	const { neighborhood, group } = params;
	const prisma = new PrismaClient();

	const [neighborhoodFound, groupFound] = await Promise.all([
		prisma.neighborhood.findMany({ where: { name: neighborhood } }),
		prisma.group.findMany({ where: { name: group } }),
	]);

	if (!neighborhoodFound.length || !groupFound.length) {
		throw new Error("Não foi possível processar o pedido.");
	}

	const neighborhoodCode = neighborhoodFound[0].code;
	const groupCode = groupFound[0].code;

	redirect(`/consulta/${neighborhoodCode}-${groupCode}`);
}
