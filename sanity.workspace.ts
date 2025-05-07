import invariant from "node:assert"

const dataset = process.env.SANITY_DATASET
const projectId = process.env.SANITY_PROJECT_ID

invariant(dataset, "SANITY_DATASET is not set")
invariant(projectId, "SANITY_PROJECT_ID is not set")

export const sanityWorkspace = {
	dataset,
	projectId,
}
