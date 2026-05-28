"use client"

function playAudio() {
	const audio = new Audio("/public_audio_aaron.mp3")
	audio.play()
}

export function NameButton({ children }: React.PropsWithChildren) {
	return (
		<button
			type="button"
			onClick={playAudio}
			aria-label="Play audio"
			className="flex h-6 w-6 items-center justify-center rounded-[50%] border-0 bg-gray-200 hover:bg-gray-300 print:hidden"
		>
			{children}
		</button>
	)
}
