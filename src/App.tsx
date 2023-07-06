import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "your-api-key",
  baseURL: "your-api-base",
  // defaultHeaders: {
  //   "api-key": "aeadadb12ecd4b2bb8df7e36ba4345bb",
  // },
});

async function testStreamMode() {
  const completion = await openai.chat.completions.create(
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "who are you?" }],
      stream: true,
    },
    {
      // query: {
      //   "api-version": "2023-03-15-preview",
      // },
    }
  );

  if (!completion.response.ok) {
    throw new Error(await completion.response.text());
  }

  for await (const iter of completion) {
    const chunk = iter.choices[0]?.delta?.content || "";
    console.debug("response chunk:", chunk);
  }
}

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    testStreamMode();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
