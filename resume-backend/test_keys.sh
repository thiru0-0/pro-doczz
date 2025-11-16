#!/bin/bash
keys=(
  "sk-abcdef1234567890abcdef1234567890abcdef12"
  "sk-1234567890abcdef1234567890abcdef12345678"
  "sk-abcdefabcdefabcdefabcdefabcdefabcdef12"
  "sk-7890abcdef7890abcdef7890abcdef7890abcd"
  "sk-1234abcd1234abcd1234abcd1234abcd1234abcd"
  "sk-abcd1234abcd1234abcd1234abcd1234abcd1234"
  "sk-5678efgh5678efgh5678efgh5678efgh5678efgh"
  "sk-efgh5678efgh5678efgh5678efgh5678efgh5678"
  "sk-ijkl1234ijkl1234ijkl1234ijkl1234ijkl1234"
  "sk-mnop5678mnop5678mnop5678mnop5678mnop5678"
)

for key in "${keys[@]}"; do
  echo "Testing: ${key:0:25}..."
  echo "OPENAI_API_KEY=$key" > .env
  sleep 2
  response=$(curl -s -X POST http://localhost:3002/api/generate-summary -H "Content-Type: application/json" -d '{"notes":"test","context":{"role":"Developer","skills":"JavaScript","type":"experienceSummary"}}' 2>/dev/null)
  if echo "$response" | grep -q '"summary"'; then
    echo "✓ SUCCESS! Working key: $key"
    echo "OPENAI_API_KEY=$key" > .env
    exit 0
  elif echo "$response" | grep -q "Incorrect API key"; then
    echo "✗ Invalid key"
  else
    echo "? Response: ${response:0:100}..."
  fi
done
echo "No working keys found in first 10"
