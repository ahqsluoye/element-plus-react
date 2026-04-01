import Color from './color';

export const getClientXY = (event: MouseEvent | TouchEvent) => {
    let clientX: number;
    let clientY: number;
    if (event.type === 'touchend') {
        clientY = (event as TouchEvent).changedTouches[0].clientY;
        clientX = (event as TouchEvent).changedTouches[0].clientX;
    } else if (event.type.startsWith('touch')) {
        clientY = (event as TouchEvent).touches[0].clientY;
        clientX = (event as TouchEvent).touches[0].clientX;
    } else {
        clientY = (event as MouseEvent).clientY;
        clientX = (event as MouseEvent).clientX;
    }
    return {
        clientX,
        clientY,
    };
};

// methods
export const displayedRgb = (color, showAlpha) => {
    if (!(color instanceof Color)) {
        throw new TypeError('color should be instance of _color Class');
    }

    const { r, g, b } = color.toRgb();
    return showAlpha ? `rgba(${r}, ${g}, ${b}, ${color.get('alpha') / 100})` : `rgb(${r}, ${g}, ${b})`;
};

export function parseColors(colors, color) {
    return colors.map(value => {
        const c = new Color();
        c.enableAlpha = true;
        c.format = 'rgba';
        c.fromString(value);
        c.selected = c.value === color.value;
        return c;
    });
}
