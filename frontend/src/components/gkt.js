export default function GKT() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-2 justify-center items-center">
        <span className="text-4xl font-bold">Google Keyword Tool</span>
        <div className="flex flex-row gap-2 mt-10 items-end">
          <label className="flex flex-col gap-2">
            <span>Keyword</span>
            <input
              type="text"
              placeholder="Enter keyword"
              className="border-2 border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span>Location</span>
            <input
              type="text"
              placeholder="Enter location"
              className="border-2 border-gray-300 rounded-md p-2"
            />
          </label>
          <button className="bg-slate-500 text-white px-4 py-2 rounded-md h-[45px]">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
