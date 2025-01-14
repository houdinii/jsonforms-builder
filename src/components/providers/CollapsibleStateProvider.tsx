// components/providers/CollapsibleStateProvider.tsx
import React, {createContext, useContext, useState} from 'react';

interface CollapsibleState {
    collapsedElements: Set<string>;
    toggleElement: (elementId: string) => void;
    isElementCollapsed: (elementId: string) => boolean;
}

const CollapsibleStateContext = createContext<CollapsibleState | null>(null);

export const CollapsibleStateProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                                      children
                                                                                  }) => {
    const [collapsedElements, setCollapsedElements] = useState<Set<string>>(
        new Set()
    );

    const toggleElement = (elementId: string) => {
        setCollapsedElements((prev) => {
            const next = new Set(prev);
            if (next.has(elementId)) {
                next.delete(elementId);
            } else {
                next.add(elementId);
            }
            return next;
        });
    };

    const isElementCollapsed = (elementId: string) => {
        return collapsedElements.has(elementId);
    };

    return (
        <CollapsibleStateContext.Provider
            value={{collapsedElements, toggleElement, isElementCollapsed}}
        >
            {children}
        </CollapsibleStateContext.Provider>
    );
};

export const useCollapsibleState = () => {
    const context = useContext(CollapsibleStateContext);
    if (!context) {
        throw new Error(
            'useCollapsibleState must be used within a CollapsibleStateProvider'
        );
    }
    return context;
};