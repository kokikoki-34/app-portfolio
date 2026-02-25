import { useState, useEffect } from "react";

export default function App() {
  const [healthMessage, setHealthMessage] = useState<string>("Loading...");

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const fetchHealth = async () => {
      try {
        const res = await fetch(API_BASE_URL + "/health");

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
