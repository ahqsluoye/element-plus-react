import { FC } from 'react';
import SkeletonGraph from './PlaceholderGraph';
import PlaceholderGrid from './PlaceholderGrid';
import PlaceholderParagraph, { PlaceholderParagraphProps } from './PlaceholderParagraph';

export interface Skeleton extends FC<PlaceholderParagraphProps> {
    Paragraph: typeof PlaceholderParagraph;
    Grid: typeof PlaceholderGrid;
    Graph: typeof SkeletonGraph;
}

const Skeleton = PlaceholderParagraph as unknown as Skeleton;

Skeleton.Paragraph = PlaceholderParagraph;
Skeleton.Grid = PlaceholderGrid;
Skeleton.Graph = SkeletonGraph;

export default Skeleton;
