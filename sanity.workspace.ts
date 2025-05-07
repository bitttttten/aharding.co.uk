import invariant from "node:assert"

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

invariant(dataset, "SANITY_DATASET is not set")
invariant(projectId, "SANITY_PROJECT_ID is not set")

export const sanityWorkspace = {
	dataset,
	projectId,
}
