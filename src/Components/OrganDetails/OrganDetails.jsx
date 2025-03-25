import { useEffect, useRef } from "react";

export default function OrganDetails({ details }) {
    const videoRef = useRef(null);
    const audio1Ref = useRef(null);
    const audio2Ref = useRef(null);

    useEffect(() => {
        // Create audio elements
        const audio1 = new Audio(details.audio);
        const audio2 = new Audio(details.tipsAudio);
        audio1Ref.current = audio1;
        audio2Ref.current = audio2;

        // Function to stop audio
        const stopAudio = () => {
            if (audio1Ref.current) {
                audio1Ref.current.pause();
                // audio1Ref.current.currentTime = 0;
            }
            if (audio2Ref.current) {
                audio2Ref.current.pause();
                // audio2Ref.current.currentTime = 0;
            }
        };

        // Function to play audio sequence
        const playAudioSequence = () => {
            stopAudio();
            setTimeout(() => {
                audio1Ref.current.play();
            }, 1500);

            audio1Ref.current.addEventListener("ended", () => {
                audio2Ref.current.play();
            });
        };

        // Handle scroll to toggle audio and video
        const handleScroll = () => {
            if (videoRef.current) {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight;
                const clientHeight = document.documentElement.clientHeight;

                // Check if user is at the bottom of the page
                if (scrollTop + clientHeight >= scrollHeight - 10) {
                    videoRef.current.play();
                    stopAudio();
                }
                // Check if user is at the top of the page
                else if (scrollTop === 0) {
                    videoRef.current.pause();
                    // videoRef.current.currentTime = 0;
                    playAudioSequence();
                }
                // If user is in the middle, pause everything
                else {
                    videoRef.current.pause();
                    // videoRef.current.currentTime = 0;
                    stopAudio();
                }
            }
        };

        // Start playing audio on mount
        playAudioSequence();

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);
        
        // Stop audio on unmount (route change or page close)
        window.addEventListener("beforeunload", stopAudio);

        return () => {
            stopAudio();
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("beforeunload", stopAudio);
        };
    }, [details.audio, details.tipsAudio]);

    return (
        <div className="max-w-4xl flex flex-col items-center gap-6 border-2 border-[#007bff] mx-auto p-6 bg-white rounded-lg shadow-xl transition-transform transform hover:scale-[1.015] hover:shadow-2xl">
            {/* Card Header with image */}
            <div className="relative w-fit h-fit">
                <img
                    src={details.puzzleImage}
                    alt={details.title}
                    className="w-full h-80 object-contain rounded-lg shadow-lg"
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                    <h2 className="text-xl font-semibold">{details.title}</h2>
                </div>
            </div>

            {/* Description */}
            <div>
                <div className="mb-6">
                    <p className="text-gray-800 text-lg font-medium leading-relaxed">
                        {details.description}
                    </p>
                </div>

                {/* Tips for Care */}
                <div>
                    <p className="text-gray-800 text-lg font-semibold mb-4">نصائح للحفاظ على العضو:</p>
                    <ul className="list-inside list-disc text-gray-700 space-y-3 text-lg">
                        {details.tips.map((tip, index) => <li key={index}>{tip}</li>)}
                    </ul>
                </div>
            </div>

            {/* Video (at the end of the page) */}
            <div className="mt-8">
                <video
                    ref={videoRef}
                    width="100%"
                    height="300"
                    controls
                    className="rounded-lg shadow-lg border-2 border-red-600"
                >
                    <source src={details.video} type="video/mp4" />
                    متصفحك لا يدعم عنصر الفيديو.
                </video>
            </div>
        </div>
    );
}
