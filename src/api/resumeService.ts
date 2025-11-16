// src/api/resumeService.ts (Frontend)

// Your backend is running on port 3002
const YOUR_BACKEND_URL = 'http://localhost:3002/api/generate-summary';

export async function getAiSummary(notes: string, context: { role?: string; skills?: string; type?: 'fresherSummary' | 'experienceSummary' }) {
  console.log("Calling local backend...", { notes, context });

  try {
    const response = await fetch(YOUR_BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notes: notes,
        context: context 
      })
    });

    if (!response.ok) {
      throw new Error('Backend request failed');
    }

    const data = await response.json();
    return data.summary; // This is the summary from your backend
  
  } catch (error) {
    console.error('Error calling local backend:', error);
    return "Error: Could not connect to your backend. Is it running?";
  }
}

