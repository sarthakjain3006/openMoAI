import { useState } from 'react';
import AIResponses from './AIResponses';

const AIModelResponseUI = () => {
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
    },
    { 
      modelId: 4, 
      text: "I suggest using a neural network to solve this problem. The model can be trained on a dataset of similar problems to learn the optimal solution.",
      timestamp: "2025-03-23T10:16:15" 
    },
    { 
      modelId: 5, 
      text: "I recommend using a reinforcement learning approach for this problem. The agent can learn the optimal policy through trial and error.",
      timestamp: "2025-03-23T10:16:30" 
    }
  ]);

  const [useVerifier, setUseVerifier] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<number | null>(null);
  const [prompt, setPrompt] = useState("What's the best algorithm to solve this optimization problem?");
  const [collapsedResponses, setCollapsedResponses] = useState<number[]>([]);

  // Toggle model enabled status
  const toggleModel = (modelId: number) => {
    setModels(models.map(model => 
      model.id === modelId ? {...model, enabled: !model.enabled} : model
    ));
  };

  // Select a response
  const selectResponse = (modelId: number) => {
    setSelectedResponse(modelId);
  };

  // Toggle between verifier and direct response
  const toggleVerifier = () => {
    setUseVerifier(!useVerifier);
  };

  // Toggle collapse for a response
  const toggleCollapse = (modelId: number) => {
    setCollapsedResponses(prev =>
      prev.includes(modelId)
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar with models */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        <h1 className="text-xl font-bold text-gray-800 mb-4">AI Models</h1>
        
        {/* Model list */}
        <div className="flex-grow overflow-auto space-y-2">
          {models.map(model => (
            <div key={model.id} className="p-2 flex items-center justify-between border rounded">
              <span className={`text-sm ${model.enabled ? 'text-gray-800' : 'text-gray-500'}`}>
                {model.name}
              </span>
              <button
                className={`px-2 py-1 text-sm rounded ${
                  model.enabled ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => toggleModel(model.id)}
              >
                {model.enabled ? "Disable" : "Enable"}
              </button>
            </div>
          ))}
        </div>
        
        {/* Verifier toggle */}
        <div className="pt-4 border-t border-gray-200 mt-4">
          <label className="inline-flex items-center">
            <input 
              type="checkbox" 
              checked={useVerifier} 
              onChange={toggleVerifier}
              className="form-checkbox"
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
              value={prompt} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              className="flex-grow border rounded px-3 py-2 text-sm"
            />
            <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Ask</button>
            </div>
        </div>
        
        {/* Responses */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          <AIResponses
            responses={responses.filter(response =>
              models.find(m => m.id === response.modelId)?.enabled
            )}
            models={models}
            collapsedResponses={collapsedResponses}
            toggleCollapse={toggleCollapse}
          />
        </div>
        
        {/* Selected response or verification */}
        {selectedResponse && (
          <div className="border-t border-gray-200 bg-white p-4">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              {useVerifier ? 'Verification Result' : 'Selected Response'}
            </h2>
            
            {useVerifier ? (
              <div className="bg-green-50 border border-green-200 p-3 rounded">
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
              <div className="border rounded p-3">
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