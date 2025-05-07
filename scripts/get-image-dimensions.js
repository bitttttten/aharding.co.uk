import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function getImageDimensions(filepath) {
	try {
		const metadata = await sharp(filepath).metadata()
		return {
			width: metadata.width,
			height: metadata.height,
			url: `/${path.relative("public", filepath)}`,
			filename: path.basename(filepath),
		}
	} catch (error) {
		console.error(`Error processing ${filepath}:`, error)
		return null
	}
}

async function main() {
	const sketchesDir = path.join(
		path.resolve(__dirname, ".."),
		"public/sketches",
	)

	try {
		const files = fs
			.readdirSync(sketchesDir)
			.filter((file) => /\.(jpg|jpeg|png)$/i.test(file))
			.map((file) => path.join(sketchesDir, file))

		const results = []
		for (const file of files) {
			const dimensions = await getImageDimensions(file)
			if (dimensions) {
				results.push(dimensions)
			}
		}

		console.log(JSON.stringify(results, null, 2))
	} catch (error) {
		console.error("Error:", error)
	}
}

main()
