const HomeTitle = ({ section }) => {
    let title = "React - Assessment";
    if (section === "user") title = "Home - User Section";
    if (section === "admin") title = "Home - Admin Section";

    return (
        <div className="text-center mt-10 mb-8">
            <h1 className="text-4xl font-bold">Generation Thailand</h1>
            <h1 className="text-4xl font-bold mt-2">{title}</h1>
        </div>
    );
};

export default HomeTitle;
