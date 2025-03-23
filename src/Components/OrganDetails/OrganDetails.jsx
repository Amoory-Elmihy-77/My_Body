

export default function OrganDetails({ details }) {
    return (
        <div className="max-w-4xl flex flex-col md:flex-row items-center gap-6 border-2 border-[#007bff] mx-auto p-6 bg-white rounded-lg shadow-xl transition-transform transform hover:scale-[1.015] hover:shadow-2xl">
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

                {/* Video */}
                <div className="mb-6">
                    <iframe
                        width="100%"
                        height="400"
                        src={details.video}
                        frameBorder="0"
                        allowFullScreen
                        className="rounded-lg shadow-lg border-2 border-red-600"
                    ></iframe>
                </div>

                {/* Audio Explanation */}
                <div className="mb-6">
                    <audio controls className="w-full rounded-4xl shadow-md">
                        <source src={details.audio} type="audio/mp3" />
                        متصفحك لا يدعم عنصر الصوت.
                    </audio>
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
