import React, { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setOutput(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/remove-bg", {
        method: "POST",
        body: formData,
      });

      const blob = await response.blob();
      const outputUrl = URL.createObjectURL(blob);
      setOutput(outputUrl);
    } catch (error) {
      alert("Error removing background.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-8 w-full max-w-2xl text-center text-white">
        <h1 className="text-4xl font-bold mb-6">Background Remover</h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 text-white file:bg-white file:text-black file:rounded file:px-4 file:py-1 file:cursor-pointer"
        />

        {preview && (
          <div className="flex gap-6 justify-center mb-4 flex-wrap">
            <div>
              <p className="font-semibold mb-2">Original</p>
              <img src={preview} alt="preview" className="h-48 rounded shadow-md" />
            </div>
            {output && (
              <div>
                <p className="font-semibold mb-2">Processed</p>
                <img src={output} alt="processed" className="h-48 rounded shadow-md" />
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={loading || !selectedFile}
          className="bg-white text-blue-800 font-semibold px-6 py-2 rounded shadow-md hover:bg-gray-200 disabled:opacity-50 transition-all"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mx-auto text-blue-800"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            "Remove Background"
          )}
        </button>

        {output && (
          <a
            href={output}
            download="no-bg.png"
            className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow-md transition-all"
          >
            Download Image
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
