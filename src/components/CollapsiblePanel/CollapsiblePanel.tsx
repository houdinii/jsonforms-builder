// src/components/CollapsiblePanel.tsx
import {type FC, type ReactNode} from 'react';
import {ChevronDown, ChevronRight, Trash2} from 'lucide-react';
import {Button} from '../ui/button';
import {Tooltip, TooltipContent, TooltipTrigger} from '../ui/tooltip';
import {useCollapsibleState} from "@/components/providers/CollapsibleStateProvider";

interface CollapsiblePanelProps {
    label: string;
    children: ReactNode;
    onRemove?: () => void;
    elementId: string; // Add this prop
}

export const CollapsiblePanel: FC<CollapsiblePanelProps> = ({
                                                                label,
                                                                children,
                                                                onRemove,
                                                                elementId
                                                            }) => {
    const {isElementCollapsed, toggleElement} = useCollapsibleState();
    const isCollapsed = isElementCollapsed(elementId);

    return (
        <div className="border rounded p-2 mb-2">
            <div className="flex items-center justify-between mb-2">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleElement(elementId)}
                >
                    {!isCollapsed ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
                    <span className="ml-2 text-sm font-medium">{label}</span>
                </div>
                {onRemove && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove();
                                }}
                            >
                                <Trash2 size={14} className="text-red-500 hover:text-red-700"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Remove Element</TooltipContent>
                    </Tooltip>
                )}
            </div>
            {!isCollapsed && <div className="mt-2 pl-2">{children}</div>}
        </div>
    );
};