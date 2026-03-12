import React from "react";
import { exportToExcel } from "../utils/excelExport";

export default function ExcelDownload({ data, filteredData }) {
  return (
    <div className="flex gap-2">
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
        onClick={() => exportToExcel(data, "students_all.xlsx")}
      >
        Download All
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
        onClick={() => exportToExcel(filteredData, "students_filtered.xlsx")}
      >
        Download Filtered
      </button>
    </div>
  );
}
