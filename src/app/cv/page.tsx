function playAudio() {
	const audio = new Audio("/public_audio_aaron.mp3")
	audio.play()
}

export default function CVPage() {
	return (
		<main>
			<h1 className="mb-2 w-full text-xl tracking-tight md:text-2xl">
				hello my name is Aaron
			</h1>
			<section className="mb-10 flex gap-2">
				<small>pronounced /ˈɛə.ɹən/</small>
				<button
					type="button"
					onClick={playAudio}
					aria-label="Play audio"
					className="flex h-6 w-6 items-center justify-center rounded-[50%] border-0 bg-gray-200 hover:bg-gray-300 print:hidden"
				>
					<svg
						className="h-[50%] w-[50%] translate-x-[1px] transform"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 210 210"
					>
						<title>Play</title>
						<path d="M179.07,105L30.93,210V0L179.07,105z" />
					</svg>
				</button>
			</section>
		</main>
	)
}
