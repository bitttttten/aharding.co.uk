import "server-only"
import { createClient } from "picosanity"
import { sanityWorkspace } from "#/sanity.workspace"

export const client = createClient({
	projectId: sanityWorkspace.projectId,
	dataset: sanityWorkspace.dataset,
	apiVersion: "2025-04-25", // use a UTC date string
	useCdn: true,
})
