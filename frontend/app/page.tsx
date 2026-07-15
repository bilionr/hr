import { API_URL } from "@/lib/api";

export default async function Page() {
  // 2. Use the imported API_URL inside a template literal
  const response = await fetch(`${API_URL}/hello`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store", 
  });

  const data = await response.json();

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Retrieving From the Server</h1>
      <p>{data.message || "No message received from backend."}</p>
    </div>
  );
}