"use server";

import { redirect } from "next/navigation";

export async function onSubmit(params: {
	neighborhood: string;
	group: string;
}) {
	const { neighborhood, group } = params;

	redirect(`/consulta/${neighborhood}-${group}`);
}
