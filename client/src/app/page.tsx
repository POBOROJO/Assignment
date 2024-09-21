import React, { useState, useEffect } from "react";

export default function Page() {
  // const [message, setMessage] = useState("Loading...");

  // useEffect(() => {
  //   fetch("http://localhost:8080/")
  //     .then((response) => response.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      This is the home page
    </main>
  );
}
