const SectionButtons = ({ setSection }) => {
    return (
        <div className="flex justify-center gap-16 mt-8 mb-12">
            <button
                onClick={() => setSection("user")}
                className="px-6 py-3 bg-white text-black font-semibold rounded-md shadow-md border hover:bg-gray-50  shadow-gray-400/50"
            >
                User Home Section
            </button>
            <button
                onClick={() => setSection("admin")}
                className="px-6 py-3 bg-white text-black font-semibold rounded-md shadow-md border hover:bg-gray-50  shadow-gray-400/50"
            >
                Admin Home Section
            </button>
        </div>
    );
};

export default SectionButtons;
