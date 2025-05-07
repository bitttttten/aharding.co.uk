import "server-only"
import { createClient } from "picosanity"
import invariant from "tiny-invariant"

const dataset = process.env.SANITY_DATASET
const projectId = process.env.SANITY_PROJECT_ID

console.log(process.env)

invariant(dataset, "SANITY_DATASET is not set")
invariant(projectId, "SANITY_PROJECT_ID is not set")

export const client = createClient({
	projectId,
	dataset,
	apiVersion: "2025-04-25", // use a UTC date string
	useCdn: true,
})
