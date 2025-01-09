import React, { useState, useEffect } from "react";

const PayoutCalculator = ({ articles, closePopup }) => {
  const [payoutRate, setPayoutRate] = useState(() => {
    const storedRate = localStorage.getItem("payoutRate");
    return storedRate ? parseFloat(storedRate) : 0;
  });

  const [totalPayout, setTotalPayout] = useState(0);

  // Calculate payout based on the description word count for each article
  const calculateArticlePayout = (articleDescription) => {
    const wordCount = articleDescription.trim().split(/\s+/).length;
    return wordCount * payoutRate; // Calculate payout based on word count
  };

  // Calculate total payout for all articles based on their description word count
  const calculateTotalPayout = () => {
    let total = 0;
    articles.forEach((article) => {
      total += calculateArticlePayout(article.description);
    });
    setTotalPayout(total);
  };

  useEffect(() => {
    calculateTotalPayout(); // Update the total payout whenever articles or payoutRate changes
  }, [articles, payoutRate]);

  const handleRateChange = (e) => {
    const rate = parseFloat(e.target.value) || 0;
    setPayoutRate(rate);
    localStorage.setItem("payoutRate", rate); // Save rate in local storage
  };

  // Function to handle CSV export
  const exportPayout = () => {
    const headers = ["Author", "Description Word Count", "Payout"];
    const rows = articles.map((article) => {
      const payout = calculateArticlePayout(article.description);
      const wordCount = article.description.trim().split(/\s+/).length;
      return [article.author, wordCount, payout.toFixed(2)];
    });

    // Combine headers and rows into one array
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    // Create a Blob from the CSV string
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a link element and simulate a click to download the file
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "payout_report.csv");
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white shadow-lg rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 p-6 max-h-full overflow-auto relative">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Payout Calculator</h2>
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-red-600 text-2xl"
        >
          &times;
        </button>

        {/* Export Button placed at top-right */}
        <button
          onClick={exportPayout}
          className="absolute top-4 right-16 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700"
        >
          Export CSV
        </button>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payout Per Article/Blog:
          </label>
          <input
            type="number"
            step="0.01"
            value={payoutRate}
            onChange={handleRateChange}
            className="mt-1 p-3 border rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="text-lg font-medium mb-4">
          Total Payout for Articles:{" "}
          <span className="text-indigo-600">${totalPayout.toFixed(2)}</span>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-800">Articles Payout</h3>
          <ul className="list-disc pl-6 space-y-2">
            {articles.map((article, index) => {
              const articlePayout = calculateArticlePayout(article.description);
              return (
                <li key={index} className="bg-gray-50 hover:bg-indigo-50 cursor-pointer px-2 py-1 rounded-md">
                  {article.author} - ${articlePayout.toFixed(2)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PayoutCalculator;
