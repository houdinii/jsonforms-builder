import { LeftSide } from "./components/LeftSide";
import { FormDataProvider } from "./components/providers/FormDataProvider";
import { RightSide } from "./components/RightSide";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <div className="min-h-screen w-screen bg-zinc-900 ">
      <div className="container mx-auto max-w-7xl px-0 flex min-h-full">
        <FormDataProvider>
          <TooltipProvider>
            <div className="w-1/2 border-r-2 min-h-full p-3">
              <LeftSide />
            </div>
            <div className="w-1/2 min-h-full p-3">
              <RightSide />
            </div>
          </TooltipProvider>
        </FormDataProvider>
      </div>
    </div>
  );
}

export default App;

