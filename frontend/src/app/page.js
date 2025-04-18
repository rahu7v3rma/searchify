const KeywordTable = ({ title }) => {
  return (
    <div className="w-1/4">
      <h1 className="text-xl font-bold">{title}</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-2 border-gray-300 rounded-md p-2 text-sm">
              Keyword
            </th>
            <th className="border-2 border-gray-300 rounded-md p-2 text-sm">
              Volume
            </th>
            <th className="border-2 border-gray-300 rounded-md p-2 text-sm">
              Competition
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="p-10">
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          <span className="text-4xl font-bold">Google Keyword Tool</span>
          <div className="flex flex-row gap-2 mt-4 items-end">
            <label className="flex flex-col gap-2">
              <span>Keyword</span>
              <input
                type="text"
                placeholder="Enter keyword"
                className="border-2 border-gray-300 rounded-md p-2 w-[300px]"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>Location</span>
              <input
                type="text"
                placeholder="Enter location"
                className="border-2 border-gray-300 rounded-md p-2 w-[300px]"
              />
            </label>
            <button className="bg-slate-500 text-white px-4 py-2 rounded-md h-[45px] cursor-pointer hover:opacity-50">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="flex mt-10 gap-4">
        <KeywordTable title="Direct" />
        <KeywordTable title="Autocomplete" />
        <KeywordTable title="Questions" />
        <KeywordTable title="Suggestions" />
      </div>
    </div>
  );
}
