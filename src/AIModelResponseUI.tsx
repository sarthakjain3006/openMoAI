import React, { useState } from 'react';

const AIModelResponseUI = () => {
  // Sample data - models and their responses
  const [models, setModels] = useState([
    { id: 1, name: "Claude 3.5 Sonnet", enabled: true },
    { id: 2, name: "Claude 3 Opus", enabled: true },
    { id: 3, name: "Claude 3.7 Sonnet", enabled: true },
    { id: 4, name: "GPT-4o", enabled: false },
    { id: 5, name: "Gemini Pro", enabled: false }
  ]);

  const [responses, setResponses] = useState([
    { 
      modelId: 1, 
      text: "Based on my analysis, the solution requires implementing a recursive algorithm with O(n log n) time complexity.",
      timestamp: "2025-03-23T10:15:32"
    },
    { 
      modelId: 2, 
      text: "I recommend a dynamic programming approach for this problem. The optimal substructure allows us to break it down into smaller subproblems.",
      timestamp: "2025-03-23T10:15:45" 
    },
    { 
      modelId: 3, 
      text: "This problem can be solved efficiently using a greedy algorithm. We can start by sorting the input array and then iterate through it once.",
      timestamp: "2025-03-23T10:16:01" 
    }
  ]);

  const [useVerifier, setUseVerifier] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [prompt, setPrompt] = useState("What's the best algorithm to solve this optimization problem?");

  // Toggle model enabled status
  const toggleModel = (modelId) => {
    setModels(models.map(model => 
      model.id === modelId ? {...model, enabled: !model.enabled} : model
    ));
  };

  // Select a response
  const selectResponse = (modelId) => {
    setSelectedResponse(modelId);
  };

  // Toggle between verifier and direct response
  const toggleVerifier = () => {
    setUseVerifier(!useVerifier);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar with models */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        <h1 className="text-xl font-bold text-gray-800 mb-4">AI Models</h1>
        
        {/* Model list */}
        <div className="flex-grow overflow-auto">
          <div className="space-y-2">
            {models.map(model => (
              <div 
                key={model.id}
                className="flex items-center justify-between p-2 rounded hover:bg-gray-50"
              >
                <span className={`text-sm ${model.enabled ? 'text-gray-800' : 'text-gray-500'}`}>
                  {model.name}
                </span>
                <button
                  onClick={() => toggleModel(model.id)}
                  className={`w-8 h-5 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    model.enabled ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <span className="w-3 h-3 bg-white rounded-full" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Verifier toggle */}
        <div className="pt-4 border-t border-gray-200 mt-4">
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              checked={useVerifier} 
              onChange={toggleVerifier}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Use verifier model</span>
          </label>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with prompt input */}
        <div className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-xl font-bold text-gray-800 mb-3">AI Model Comparison</h1>
          <div className="flex">
            <input 
              type="text" 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-l shadow-sm"
              placeholder="Enter your prompt here..."
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r">
              Ask
            </button>
          </div>
        </div>
        
        {/* Responses */}
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {responses.filter(response => 
              models.find(m => m.id === response.modelId)?.enabled
            ).map(response => {
              const model = models.find(m => m.id === response.modelId);
              return (
                <div 
                  key={response.modelId}
                  onClick={() => selectResponse(response.modelId)}
                  className={`p-4 rounded border ${
                    selectedResponse === response.modelId 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  } cursor-pointer`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-800">{model?.name}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(response.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{response.text}</p>
                  
                  {/* Selection controls */}
                  <div className="mt-3 flex justify-end">
                    <button 
                      className={`text-sm px-3 py-1 rounded ${
                        selectedResponse === response.modelId 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {useVerifier ? 'Verify' : 'Select'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Selected response or verification */}
        {selectedResponse && (
          <div className="border-t border-gray-200 bg-white p-4">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              {useVerifier ? 'Verification Result' : 'Selected Response'}
            </h2>
            
            {useVerifier ? (
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <div className="flex items-center mb-2">
                  <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                  <span className="font-medium text-green-800">Verified as accurate</span>
                </div>
                <p className="text-gray-700">
                  The response from {models.find(m => m.id === selectedResponse)?.name} has been verified 
                  and is technically accurate. The proposed algorithm is appropriate for the given problem.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-700">
                  {responses.find(r => r.modelId === selectedResponse)?.text}
                </p>
                <div className="mt-3 text-xs text-gray-500">
                  Response from {models.find(m => m.id === selectedResponse)?.name}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIModelResponseUI;