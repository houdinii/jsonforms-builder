import { LeftSide } from "./components/LeftSide";
import { FormDataProvider } from "./components/providers/FormDataProvider";
import { RightSide } from "./components/RightSide";

function App() {
  return (
    <div className="h-screen w-screen bg-zinc-900 ">
      <div className="container mx-auto max-w-7xl px-0 flex h-full">
        <FormDataProvider>
          <div className="w-1/2 border-r-2 h-full p-3">
            <LeftSide />
          </div>
          <div className="w-1/2 h-full p-3">
            <RightSide />
          </div>
        </FormDataProvider>
      </div>
    </div>
  );
}

export default App;

