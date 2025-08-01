import React from 'react';

interface IconProps {
    className?: string;
    style?: React.CSSProperties;
}

const NpmIcon: React.FC<IconProps> = props => {
    const { className, style } = props;
    return (
        <span
            className={className}
            style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0, textAlign: 'center', verticalAlign: '-0.25em', marginRight: 5, ...style }}
        >
            <svg fill="#E53E3E" focusable="false" height="1em" stroke="#E53E3E" strokeWidth="0" viewBox="0 0 16 16" width="1em">
                <title>npm icon</title>
                <path d="M0 0v16h16v-16h-16zM13 13h-2v-8h-3v8h-5v-10h10v10z" />
            </svg>
        </span>
    );
};

export default NpmIcon;
