/* eslint-disable lines-around-comment */
import React, { Fragment, memo, useContext } from 'react';
import DescriptionsCell from './DescriptionsCell';
import { DescriptionsContext } from './DescriptionsContext';
import { DescriptionsItemProps } from './typings';

interface Props {
    row: React.ReactElement<DescriptionsItemProps>[];
}

const DescriptionsRow = ({ row }: Props) => {
    const { direction, border } = useContext(DescriptionsContext);

    return direction === 'vertical' ? (
        <>
            <tr>
                {row.map((cell, index) => (
                    <DescriptionsCell key={`tr1-${index}`} cell={cell} tag="th" type="label" />
                ))}
            </tr>
            <tr>
                {row.map((cell, index) => (
                    <DescriptionsCell key={`tr2-${index}`} cell={cell} tag="td" type="content" />
                ))}
            </tr>
        </>
    ) : (
        <tr>
            {row.map((cell, index) =>
                border ? (
                    <Fragment key={`tr1-${index}`}>
                        <DescriptionsCell cell={cell} tag="th" type="label" />
                        <DescriptionsCell cell={cell} tag="th" type="content" />
                    </Fragment>
                ) : (
                    <DescriptionsCell key={`tr3-${index}`} cell={cell} tag="th" type="both" />
                ),
            )}
        </tr>
    );
};

DescriptionsRow.displayName = 'DescriptionsRow';

export default memo(DescriptionsRow);
