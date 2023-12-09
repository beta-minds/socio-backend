import { BugAntIcon } from "@heroicons/react/24/outline";

export default function FileUpload() {
  return (
    <div className="flex items-center justify-center mt-4">
      <label className="flex flex-col items-center px-4 py-2 text-blue-700 bg-white border border-blue-500 rounded-lg shadow-lg cursor-pointer hover:bg-blue-500 hover:text-white">
        <BugAntIcon className="w-10 h-10" />
        <span className="mt-2">Upload a file</span>
        <input type="file" className="hidden" />
      </label>
    </div>
  );
}
