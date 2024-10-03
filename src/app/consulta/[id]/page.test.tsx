import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import Page from "./page";

test("Page", () => {
	render(<Page params={{ id: "a" }} />);

	const main = within(screen.getByRole("main"));

	expect(main).toBeDefined();
});
