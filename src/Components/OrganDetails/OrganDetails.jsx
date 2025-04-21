import { useEffect, useRef } from "react";

export default function OrganDetails({ details }) {
    const videoRef = useRef(null);

    useEffect(() => {
        // Handle scroll to auto-play video when in view
        const handleScroll = () => {
            if (videoRef.current) {
                const videoElement = videoRef.current;
                const rect = videoElement.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Check if video is in viewport
                if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
                    videoElement.play();
                } else {
                    videoElement.pause();
                }
            }
        };

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);
        
        // Initial check for video visibility
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="max-w-4xl flex flex-col items-center gap-6 border-2 border-[#007bff] mx-auto p-6 bg-white rounded-lg shadow-xl transition-transform transform hover:scale-[1.015] hover:shadow-2xl">
            
            {/* Video */}
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
        </div>
    );
}
