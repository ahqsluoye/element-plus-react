import React, { Fragment, memo, useContext } from 'react';
import DescriptionsCell from './DescriptionsCell';
import { DescriptionsContext } from './DescriptionsContext';
import { DescriptionsItemProps } from './typings';

interface Props {
    row: React.ReactElement<DescriptionsItemProps>[];
}

const DescriptionsRow = memo(({ row }: Props) => {
    const { direction, border } = useContext(DescriptionsContext);

    return direction === 'vertical' ? (
        <>
            <tr>
                {row.map((cell, index) => (
                    <DescriptionsCell key={`tr1-${index}`} _key={`tr1-${index}`} cell={cell} tag="th" type="label" />
                ))}
            </tr>
            <tr>
                {row.map((cell, index) => (
                    <DescriptionsCell key={`tr2-${index}`} _key={`tr2-${index}`} cell={cell} tag="td" type="content" />
                ))}
            </tr>
        </>
    ) : (
        <tr>
            {row.map((cell, index) =>
                border ? (
                    <Fragment key={`tr1-${index}`}>
                        <DescriptionsCell key={`tr1-${index}-label`} _key={`tr1-${index}-label`} cell={cell} tag="th" type="label" />
                        <DescriptionsCell key={`tr1-${index}-content`} _key={`tr1-${index}-content`} cell={cell} tag="th" type="content" />
                    </Fragment>
                ) : (
                    <DescriptionsCell key={`tr3-${index}`} _key={`tr3-${index}`} cell={cell} tag="th" type="both" />
                ),
            )}
        </tr>
    );
});

DescriptionsRow.displayName = 'ElDescriptionsRow';

export default DescriptionsRow;
