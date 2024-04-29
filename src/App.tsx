import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./output.css";
import HeatmapGlobe from "./components/HeatmapGlobe";
import {
  NextUIProvider,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import Controls from "./components/Controls";
import { CalendarDate, DateValue, DateDuration } from "@internationalized/date";

function App() {
  const [date, setDate] = useState<CalendarDate>(new CalendarDate(1950, 1, 1));

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <NextUIProvider>
        <HeatmapGlobe date={date} />
        <Controls date={date} setDate={setDate} />
      </NextUIProvider>
    </>
  );
}

export default App;
