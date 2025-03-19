import React, { Key } from 'react';

export type RenderFunc<T> = (item: T, index: number, props: { style?: React.CSSProperties }) => React.ReactElement;

export interface SharedConfig<T> {
    getKey: (item: T) => Key;
}

export type GetKey<T> = (item: T) => Key;
