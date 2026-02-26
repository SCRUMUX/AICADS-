import React from 'react';
import type { GridContainerProps, GridItemProps } from './GridContainer.types';
/**
 * Responsive grid container that auto-switches 4→8→12 columns at breakpoints.
 * Uses the `.grid-container` Tailwind utility under the hood.
 */
export declare const GridContainer: React.ForwardRefExoticComponent<GridContainerProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Grid item that accepts responsive span/start props.
 * Generates Tailwind responsive classes for grid-column placement.
 */
export declare const GridItem: React.ForwardRefExoticComponent<GridItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GridContainer.d.ts.map