import React, { useEffect, useMemo, useState } from 'react';
import { useClassNames } from '../hooks';
import type { PosInfo } from './typings';

interface MaskProps {
    zIndex?: number;
    visible?: boolean;
    fill?: string;
    pos?: PosInfo | null;
    targetAreaClickable?: boolean;
    style?: React.CSSProperties;
}

function Mask({ zIndex = 1001, visible = false, fill = 'rgba(0,0,0,0.5)', pos, targetAreaClickable = true, style }: MaskProps) {
    const ns = useClassNames('tour');

    const radius = pos?.radius ?? 2;

    const roundInfo = useMemo(() => {
        const v = radius;
        const baseInfo = `a${v},${v} 0 0 1`;
        return {
            topRight: `${baseInfo} ${v},${v}`,
            bottomRight: `${baseInfo} ${-v},${v}`,
            bottomLeft: `${baseInfo} ${-v},${-v}`,
            topLeft: `${baseInfo} ${v},${-v}`,
        };
    }, [radius]);

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const path = useMemo(() => {
        const { width, height } = windowSize;
        const info = roundInfo;
        const _path = `M${width},0 L0,0 L0,${height} L${width},${height} L${width},0 Z`;
        const _radius = radius;

        if (!pos) {
            return _path;
        }

        return `${_path} M${pos.left + _radius},${pos.top} h${pos.width - _radius * 2} ${info.topRight} v${pos.height - _radius * 2} ${info.bottomRight} h${
            -pos.width + _radius * 2
        } ${info.bottomLeft} v${-pos.height + _radius * 2} ${info.topLeft} z`;
    }, [windowSize, roundInfo, radius, pos]);

    const maskStyle: React.CSSProperties = {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex,
        pointerEvents: pos && targetAreaClickable ? 'none' : 'auto',
        ...style,
    };

    const pathStyle: React.CSSProperties = {
        fill,
        pointerEvents: 'auto',
        cursor: 'auto',
    };

    if (!visible) {
        return null;
    }

    return (
        <div className={ns.e('mask')} style={maskStyle}>
            <svg style={{ width: '100%', height: '100%' }}>
                <path className={ns.e('hollow')} style={pathStyle} d={path} />
            </svg>
        </div>
    );
}

export default Mask;
