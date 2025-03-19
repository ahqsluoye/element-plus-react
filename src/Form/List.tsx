import React, { FC, useContext, useMemo, useRef } from 'react';
import { warning } from '../Util';
import FieldContext from './FieldContext';
import FormItem from './FormItem';
import ListContext, { ListContextProps } from './ListContext';
import type { InternalNamePath, Meta, NamePath, StoreValue, ValidatorRule } from './typings';
import { getNamePath, move } from './utils/valueUtil';

export interface ListField {
    name: number;
    key: number;
    isListField: boolean;
}

export interface ListOperations {
    add: (defaultValue?: StoreValue, index?: number) => void;
    remove: (index: number | number[]) => void;
    move: (from: number, to: number) => void;
}

export interface ListProps {
    name: NamePath;
    rules?: ValidatorRule[];
    validateTrigger?: string | string[] | false;
    initialValue?: any[];
    children?: (fields: ListField[], operations: ListOperations, meta: Meta) => React.ReactElement;
}

const List: FC<ListProps> = ({ name, initialValue, children, rules, validateTrigger }) => {
    const context = useContext(FieldContext);
    const keyRef = useRef({
        keys: [],
        id: 0,
    });
    const keyManager = keyRef.current;

    const prefixName: InternalNamePath = useMemo(() => {
        const parentPrefixName = getNamePath(context.prefixName) || [];
        return [...parentPrefixName, ...getNamePath(name)];
    }, [context.prefixName, name]);

    const fieldContext = useMemo(() => ({ ...context, prefixName }), [context, prefixName]);

    // List context
    const listContext = useMemo<ListContextProps>(
        () => ({
            getKey: (namePath: InternalNamePath) => {
                const len = prefixName.length;
                const pathName = namePath[len];
                return [keyManager.keys[pathName], namePath.slice(len + 1)];
            },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [prefixName],
    );

    // User should not pass `children` as other type.
    if (typeof children !== 'function') {
        warning(false, 'Form.List only accepts function as children.');
        return null;
    }

    const shouldUpdate = (prevValue: StoreValue, nextValue: StoreValue, { source }) => {
        if (source === 'internal') {
            return false;
        }
        return prevValue !== nextValue;
    };

    return (
        <ListContext.Provider value={listContext}>
            <FieldContext.Provider value={fieldContext}>
                <FormItem name={[]} shouldUpdate={shouldUpdate} rules={rules} validateTrigger={validateTrigger} initialValue={initialValue} isList>
                    {({ value = [], onChange }, meta) => {
                        const { getFieldValue } = context;
                        const getNewValue = () => {
                            const values = getFieldValue(prefixName || []) as StoreValue[];
                            return values || [];
                        };

                        /**
                         * Always get latest value in case user update fields by `form` api.
                         */
                        const operations: ListOperations = {
                            add: (defaultValue, index?: number) => {
                                // Mapping keys
                                const newValue = getNewValue();

                                if (index >= 0 && index <= newValue.length) {
                                    keyManager.keys = [...keyManager.keys.slice(0, index), keyManager.id, ...keyManager.keys.slice(index)];
                                    onChange([...newValue.slice(0, index), defaultValue, ...newValue.slice(index)]);
                                } else {
                                    if (process.env.NODE_ENV !== 'production' && (index < 0 || index > newValue.length)) {
                                        warning(false, 'The second parameter of the add function should be a valid positive number.');
                                    }
                                    keyManager.keys = [...keyManager.keys, keyManager.id];
                                    onChange([...newValue, defaultValue]);
                                }
                                keyManager.id += 1;
                            },
                            remove: (index: number | number[]) => {
                                const newValue = getNewValue();
                                const indexSet = new Set(Array.isArray(index) ? index : [index]);

                                if (indexSet.size <= 0) {
                                    return;
                                }
                                keyManager.keys = keyManager.keys.filter((_, keysIndex) => !indexSet.has(keysIndex));

                                // Trigger store change
                                onChange(newValue.filter((_, valueIndex) => !indexSet.has(valueIndex)));
                            },
                            move(from: number, to: number) {
                                if (from === to) {
                                    return;
                                }
                                const newValue = getNewValue();

                                // Do not handle out of range
                                if (from < 0 || from >= newValue.length || to < 0 || to >= newValue.length) {
                                    return;
                                }

                                keyManager.keys = move(keyManager.keys, from, to);

                                // Trigger store change
                                onChange(move(newValue, from, to));
                            },
                        };

                        let listValue = value || [];
                        if (!Array.isArray(listValue)) {
                            listValue = [];

                            if (process.env.NODE_ENV !== 'production') {
                                warning(false, `Current value of '${prefixName.join(' > ')}' is not an array type.`);
                            }
                        }

                        return children(
                            (listValue as StoreValue[]).map((__, index): ListField => {
                                let key = keyManager.keys[index];
                                if (key === undefined) {
                                    keyManager.keys[index] = keyManager.id;
                                    key = keyManager.keys[index];
                                    keyManager.id += 1;
                                }

                                return {
                                    name: index,
                                    key,
                                    isListField: true,
                                };
                            }),
                            operations,
                            meta,
                        );
                    }}
                </FormItem>
            </FieldContext.Provider>
        </ListContext.Provider>
    );
};

export default List;
