import { useState } from "react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [code, setCode] = useState(`function test() {
  const x = 5;
  console.log(x);
  const y = 10;
}`);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeCode = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      console.log(data)
      setResult(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-1/2 p-6">
        <h1 className="text-xl mb-5">AI Code Reviewer</h1>

        <Editor
          height="78vh"
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
        />

        <button
          onClick={analyzeCode}
          className="mt-4 px-4 py-2 bg-blue-600 rounded"
        >
          {loading ? "Analyzing..." : "Analyze Code"}
        </button>
      </div>

      <div className="w-1/2 p-6 border-l border-gray-700 overflow-auto">
        <h2 className="text-xl mb-5">Results</h2>

        {!result && <p className="text-gray-400">No analysis yet</p>}

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-4 text-green-400">
                {result.summary}
              </p>

              {(result.explanations?.explanations || []).map((item, i) => (
                <div
                  key={i}
                  className="mb-4 p-3 bg-gray-800 rounded"
                >
                  <p className="text-red-400 font-bold">
                    {item.issue} {item.line ? `(line ${item.line})` : ""}
                  </p>

                  <p className="text-sm mt-2">
                    {item.why}
                  </p>

                  <p className="text-blue-300 mt-2">
                    Fix: {item.fix}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
     </div>
  </div>
  );}