"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { onSubmit } from "./submit-form";

const formSchema = z.object({
	neighborhood: z
		.string()
		.min(2, { message: "Por favor, selecione uma localidade" })
		.max(255, { message: "Ops! Tem algo de errado com essa localidade." }),
	group: z
		.string()
		.min(2, { message: "Por favor, selecione uma atividade" })
		.max(255, { message: "Ops! Tem algo de errado com essa atividade." }),
});

export function ConsultationForm({
	neighborhoods,
	groups,
}: { neighborhoods: { name: string }[]; groups: { name: string }[] }) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			neighborhood: "",
			group: "",
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((data) => onSubmit({ ...data }))}
				className="relative flex flex-col items-center space-y-12"
			>
				<FormField
					control={form.control}
					name="group"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">
								Qual será a atividade da sua empresa?
							</FormLabel>
							<FormDescription className="text-sm text-justify">
								A atividade que uma empresa atua é o setor ou área específica em
								que ela oferece produtos ou serviços, como comércio, indústria,
								tecnologia ou serviços especializados.
							</FormDescription>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-[380px]">
										<SelectValue placeholder="Selecione a atividade" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{groups.map(({ name }) => (
										<SelectItem value={name} key={name}>
											{name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="neighborhood"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">
								Qual será a localidade da sua empresa?
							</FormLabel>
							<FormDescription className="text-sm text-justify">
								A escolha de um lugar para a abertura de um empreendimento é
								crucial no momento da elaboração da análise de viabilidade de um
								negócio.
							</FormDescription>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-[380px]">
										<SelectValue placeholder="Selecione a localidade" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{neighborhoods.map(({ name }) => (
										<SelectItem value={name} key={name}>
											{name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-[280px] h-[45px]">
					Analisar
				</Button>
			</form>
		</Form>
	);
}
