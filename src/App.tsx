import Split from 'react-split';
import {LeftSide} from "./components/LeftSide";
import {FormDataProvider} from "./components/providers/FormDataProvider";
import {RightSide} from "./components/RightSide";
import {TooltipProvider} from "./components/ui/tooltip";
import {Footer} from "@/components/Footer/Footer";
import {CollapsibleStateProvider} from "@/components/providers/CollapsibleStateProvider";

function App() {
    return (
        <div className="w-screen bg-zinc-950">
            <div className="min-h-[calc(100vh-64px)]"> {/* Removed container and max-w classes */}
                <FormDataProvider>
                    <CollapsibleStateProvider>
                        <TooltipProvider>
                            <Split
                                sizes={[25, 75]} // Initial split sizes (25% left, 75% right)
                                minSize={300} // Minimum size for each pane
                                expandToMin={false}
                                gutterSize={8}
                                gutterAlign="center"
                                snapOffset={30}
                                dragInterval={1}
                                direction="horizontal"
                                cursor="col-resize"
                                className="flex"
                            >
                                <div className="h-[calc(100vh-64px)] overflow-y-auto">
                                    <div className="p-3">
                                        <LeftSide/>
                                    </div>
                                </div>
                                <div className="h-[calc(100vh-64px)] overflow-y-auto">
                                    <div className="p-3">
                                        <RightSide/>
                                    </div>
                                </div>
                            </Split>
                        </TooltipProvider>
                    </CollapsibleStateProvider>
                </FormDataProvider>
            </div>
            <Footer/>
        </div>
    );
}

export default App;