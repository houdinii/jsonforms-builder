import { LeftSide } from "./components/LeftSide";
import { FormDataProvider } from "./components/providers/FormDataProvider";
import { RightSide } from "./components/RightSide";
import { TooltipProvider } from "./components/ui/tooltip";

import { Footer } from "@/components/Footer/Footer";

function App() {
  return (
    <div className=" w-screen bg-zinc-950 ">
      <div className="container min-h-[calc(100vh-64px)] mx-auto max-w-7xl px-0 flex">
        <FormDataProvider>
          <TooltipProvider>
            <div className="w-1/2 p-3 border-l-white border-r-[0.5px]">
              <LeftSide />
            </div>
            <div className="w-1/2 p-3">
              <RightSide />
            </div>
          </TooltipProvider>
        </FormDataProvider>
      </div>
      <Footer />
    </div>
  );
}

export default App;

