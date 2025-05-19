import { useState } from 'react';

export default function TermsBuddyForm() {
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [dataTypes, setDataTypes] = useState('');
  const [policy, setPolicy] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePolicy = async () => {
    setLoading(true);
    setPolicy('');
    try {
      const res = await fetch('/api/generate-policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, website, dataTypes })
      });
      const data = await res.json();
      setPolicy(data.policy);
    } catch (err) {
      setPolicy('Error generating policy.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Generate a Privacy Policy</h1>
      <div className="space-y-4">
        <input
          placeholder="Business Name"
          className="border px-3 py-2 w-full"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <input
          placeholder="Website URL"
          className="border px-3 py-2 w-full"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <input
          placeholder="What data do you collect?"
          className="border px-3 py-2 w-full"
          value={dataTypes}
          onChange={(e) => setDataTypes(e.target.value)}
        />
        <button
          onClick={generatePolicy}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Policy'}
        </button>
        {policy && (
          <textarea
            className="w-full h-96 border p-3 mt-4"
            value={policy}
            readOnly
          />
        )}
      </div>
    </div>
  );
}
