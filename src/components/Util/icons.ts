import { IconProps } from '@qsxy/element-plus-react/Icon/typings';

export const ValidateComponentsMap: Record<'validating' | 'success' | 'error', IconProps> = {
    validating: {
        name: 'loader',
        prefix: 'far',
        spin: true,
    },
    success: {
        name: 'circle-check',
        prefix: 'fal',
    },
    error: {
        name: 'circle-xmark',
        prefix: 'fal',
    },
};
