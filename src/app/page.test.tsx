import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import Page from "../app/page";

test("Page", () => {
	render(<Page />);

	const main = within(screen.getByRole("heading"));

	expect(main).toBeDefined();
});
