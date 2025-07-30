const SectionTitle = ({ Heading, subHeading }) => {
    return (
        <div className="w-full max-w-xl mx-auto text-center py-12">
            {/* Top Accent Line */}
            <div className="w-10 h-1 bg-yellow-500 mx-auto mb-4 rounded-full" />

            {/* Subheading */}
            <p className=" text-sm md:text-base font-bold tracking-wide uppercase mb-2">
                {subHeading}
            </p>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-black uppercase  relative inline-block">
                {Heading}
                {/* Glowing underline */}
                <span className="block h-[4px] w-36 bg-yellow-400 rounded-full mt-2 mx-auto shadow-lg shadow-yellow-300/50" />
            </h2>
        </div>
    );
};

export default SectionTitle;
