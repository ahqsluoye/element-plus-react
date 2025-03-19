/* eslint-disable lines-around-comment */
import { BaseProps } from '../../types/common';
import { ElementOf, tuple } from '../../types/type';
import { FieldNames, KeyWiseTransferItem } from './index';
import { RenderedItem, TransferListProps } from './list';

export const OmitProps = tuple('handleFilter', 'handleClear', 'checkedKeys', 'instance');
export type OmitProp = ElementOf<typeof OmitProps>;
type PartialTransferListProps<RecordType> = Omit<TransferListProps<RecordType>, OmitProp>;

export interface ListBodyRef {
    getItems: RenderedItem<KeyWiseTransferItem>[];
}

export interface TransferListBodyProps<RecordType> extends PartialTransferListProps<RecordType>, BaseProps {
    filteredItems: RecordType[];
    filteredRenderItems: RenderedItem<RecordType>[];
    selectedKeys: (string | number)[];
    /** 数据源的字段别名 */
    fieldNames: FieldNames;
}
