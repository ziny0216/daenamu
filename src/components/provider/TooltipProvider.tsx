'use client';
import { createContext, ReactNode, useState } from 'react';
import { DefaultObj, TooltipContextType } from '@/types/components/common';
import Tooltip from '@/components/common/Tooltip';

export const TooltipContext = createContext<TooltipContextType | null>(null);
export default function TooltipProvider({ children }: { children: ReactNode }) {
  const [tooltipState, setTooltipState] = useState<{
    visible: boolean;
    list: DefaultObj[];
    position: { x: number; y: number };
  }>({
    visible: false,
    list: [],
    position: { x: 0, y: 0 },
  });

  const [selectedItem, setSelectedItem] = useState<DefaultObj | null>(null);
  return (
    <TooltipContext.Provider
      value={{
        setTooltipState,
        tooltipState,
        selectedItem,
      }}
    >
      {children}
      {tooltipState.visible && (
        <Tooltip
          onClick={item => {
            setSelectedItem(item);
            setTooltipState(prev => ({ ...prev, visible: false }));
          }}
          toolTipList={tooltipState.list}
          position={tooltipState.position}
        />
      )}
    </TooltipContext.Provider>
  );
}
