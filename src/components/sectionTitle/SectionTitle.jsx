const SectionTitle = ({ Heading, subHeading }) => {
    return (
        <div className="w-full text-center flex flex-col items-center justify-center pb-12 space-y-4">

            {/* Subheading */}
            <p className="text-sm md:text-base text-yellow-500 tracking-wider italic">
                {subHeading}
            </p>

            {/* Line & Heading combined */}
            <div className="relative w-fit px-6">
                {/* Top decorative line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-300 z-0"></div>

                {/* Heading text with background */}
                <h2 className="relative z-10 text-2xl md:text-4xl font-bold uppercase bg-white px-4 text-gray-800">
                    {Heading}
                </h2>
            </div>

            {/* Bottom Line */}
            <div className="w-24 h-1 bg-yellow-500 rounded-full"></div>
        </div>
    );
};

export default SectionTitle;
