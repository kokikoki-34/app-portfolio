import { useState, useEffect } from "react";

export default function App() {
  const [healthMessage, setHealthMessage] = useState<string>("Loading...");

  useEffect(() => {
    const API_URL = import.meta.env.VITE_URL_BACKEND;
    const API_PORT = import.meta.env.VITE_PORT_BACKEND;

    const fetchHealth = async () => {
      try {
        const backendUrl = new URL(API_URL);
        if (API_PORT) backendUrl.port = API_PORT;

        const res = await fetch(new URL('/health', backendUrl));

        if(!res.ok){
          setHealthMessage("Error fetching health")
          return;
        }

        const data = await res.text();
        setHealthMessage(data);
      }
      catch(error) {
        if (error instanceof Error) {
          setHealthMessage("An error occurred:" + error.message);
        } else if (typeof error === "string") {
          setHealthMessage("An error occurred:" + error.toUpperCase());
        } else {
          setHealthMessage("An unknown error occurred");
        }
      }
    };

    fetchHealth();

  }, []);

  return <p>{healthMessage}</p>;
}
