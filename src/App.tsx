import React, { useState } from 'react';
import axios from "axios";
import './App.css';

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let response: any = {};
      response = await axios.get("http://localhost:8080/api/v1/dashboard/map?published=true", {
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJxak9tcmVmdEZ3YmdOLTVQVldBZmF5NlRGeWJ2aHdDS2c5Qm5RbjBqQndrIn0.eyJleHAiOjE3MjA3NTIyNDcsImlhdCI6MTcyMDc1MTY0NywianRpIjoiNDQ2YTczY2EtNzMxOS00OTQwLTk3M2UtYjU5Njc4OWMzOGM4IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zc28uZGFiZWVvLmNvbS9hdXRoL3JlYWxtcy9kYWJlZW8tcmVhbG0iLCJhdWQiOlsiYWNjb3VudCIsInN0dWRpby1lZGl0b3ItY2xpZW50Il0sInN1YiI6IjdmZGI2YmU0LWJmYzktNDU4MC05ZjE0LTljMDc2YTljYTIxNCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImRhYmVlby1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiZDQ2MjVjOTMtMDUxYi00YTM3LTllYTMtNTVhNGZmYTgwNzc2IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtZGFiZWVvLXJlYWxtIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX0sInN0dWRpby1lZGl0b3ItY2xpZW50Ijp7InJvbGVzIjpbIkNPUlBfTUFTVEVSIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDQ2MjVjOTMtMDUxYi00YTM3LTllYTMtNTVhNGZmYTgwNzc2Iiwib3duZXIiOiI5azZOTEJIbzRmemI4RE9IaE9ZRWRFIiwiZWRpdG9yX3NlcnZpY2UiOiJTVFVESU80IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoi64uk67mE7Jik6rCc67Cc7J6QIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGV2ZWxvcGVydGVzdCIsImdpdmVuX25hbWUiOiLri6TruYTsmKTqsJzrsJzsnpAiLCJlbWFpbCI6Imp1aHllb24ua2ltQGRhYmVlby5jb20iLCJzdGF0dXMiOiJVU0UifQ.dWeIL5pzikcpjvGcZDv-kXfdJnaiFx7R1PnXPDs_rj7gtxzicxM0JIpq-VhqgYtjclJHfiq3Xo4QD2OFNAaMP-IetVRCX3U7bOxSbzgiIq3zTYQeMooIzyQQXw_4wwdsqJUMUAPn4qXtBoRFTzWQXN8VYW7Lk0chdqNNjwR_7xRh_Dyoi34axuwwiNz2Fhry2mTnfZMSfY0j5xzNf4zKA-_QevlXY-gSZOx6WTnapA2zdSr4wEXslIMXUmOGIooFZEA1ZP8WT1fv93JT97ANkGJJI9gX167HeGJl03bMdSIZtrcyiwtHkXPw4REmofh6NR-X0oGGiepwb69oLrHOeA',
              //  'X-Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXBfaWQiOiJjMTg1NDNkOS1mMDMzLTQwNWUtOGU4Yy05N2E5MzE2MzRiNTciLCJvd25lcl9pZCI6ImFkdTRkREJqUW44OWVMLWU3UzRScGkiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNzIyNTExOTE5LCJhdXRob3JpdGllcyI6WyJDT1JQX01BU1RFUiJdLCJqdGkiOiI3ZDllYzQyMi01OTZjLTRhYTYtODljZC05OThjN2YxNTY3YWQiLCJjbGllbnRfaWQiOiI0WVdyVHZ6WTRwQThHZ283UzcxYXRnIn0.hl5seCi_V6jGtVxEQZo74780W72kHIBIpVWJ4jlHbxUwrpbYliZp2lgqyLPvwpHTXJ43y3LiyVE1TY5KONieH-59kARrRcNWpXWnzLIaBAmkEdmXwhuTKfeyudnmg1mxvFKG7DIAqnoymqvfRhfobe3CW2Mqmf9D2UK-yrN1-yWR3kjDFkfeoA3_NoiVy395VExMUd8rDHHROSd-GRFYEdJogDDUlo5Rxa0SfuZ8OqzUJuMfvqbhjAEqLDvs6uPYldJ-ojQAqLvu74a_pRSt1LnGUAh6kWIg3fXPekSvY0SMO7dBQXRbi_uqE1EncTyKhshgbL9GtmdWlst1-Hf81g',
            },
            // withCredentials: true // If you need to include credentials
          }
      ).catch((error: { message: any; }) => {
        if (axios.isAxiosError(error)) {
          // Axios-specific error handling
          console.error('Axios error:', error.message);
        }
        // console.log(response?.data)
      });

      setData(response.data);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="App">
        <header className="App-header">
          <h1>Carrot Cors Test</h1>
          <button onClick={fetchData} disabled={loading}>
            {loading ? 'Loading...' : '클릭'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {data && (
              <div>
                <h2>Data:</h2>
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </div>
          )}
        </header>
      </div>
  );
};

export default App;