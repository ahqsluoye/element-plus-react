import { ElDescriptions, ElDescriptionsItem, ElIcon, ElRadio, ElRadioGroup, ElTag, TypeAttributes } from '@parker/element-plus-react';
import React, { useMemo, useState } from 'react';
import './sizes.scss';

const App = () => {
    const [size, setSize] = useState<TypeAttributes.Size>(null);
    const iconStyle = useMemo(() => {
        const marginMap = {
            large: '8px',
            default: '6px',
            small: '4px',
        };
        return {
            marginRight: marginMap[size] || marginMap.default,
        };
    }, [size]);

    const blockMargin = useMemo(() => {
        const marginMap = {
            large: '32px',
            default: '28px',
            small: '24px',
        };
        return {
            width: 800,
            marginTop: marginMap[size] || marginMap.default,
        };
    }, [size]);

    return (
        <div>
            <ElRadioGroup onChange={(value: TypeAttributes.Size) => setSize(value)}>
                <ElRadio value="large">大</ElRadio>
                <ElRadio value={null}>默认</ElRadio>
                <ElRadio value="small">小</ElRadio>
            </ElRadioGroup>

            <ElDescriptions title="Vertical list with border" direction="vertical" column={4} size={size} border style={{ width: 800 }}>
                <ElDescriptionsItem
                    label={
                        <div className="cell-item">
                            <ElIcon name="user" style={iconStyle} />
                            Username
                        </div>
                    }
                >
                    kooriookami
                </ElDescriptionsItem>

                <ElDescriptionsItem
                    label={
                        <div className="cell-item">
                            <ElIcon name="phone" style={iconStyle} />
                            Telephone
                        </div>
                    }
                >
                    18100000000
                </ElDescriptionsItem>
                <ElDescriptionsItem
                    label={
                        <div className="cell-item">
                            <ElIcon name="location" style={iconStyle} />
                            Place
                        </div>
                    }
                >
                    Suzhou
                </ElDescriptionsItem>
                <ElDescriptionsItem
                    label={
                        <div className="cell-item">
                            <ElIcon name="ticket" style={iconStyle} />
                            Remarks
                        </div>
                    }
                >
                    <ElTag size="small">School</ElTag>
                </ElDescriptionsItem>
                <ElDescriptionsItem
                    label={
                        <div className="cell-item">
                            <ElIcon name="building" style={iconStyle} />
                            Address
                        </div>
                    }
                >
                    No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
                </ElDescriptionsItem>
            </ElDescriptions>

            <ElDescriptions title="Vertical list without border" direction="vertical" column={4} size={size} style={blockMargin}>
                <ElDescriptionsItem label="Username">kooriookami</ElDescriptionsItem>
                <ElDescriptionsItem label="Telephone">18100000000</ElDescriptionsItem>
                <ElDescriptionsItem label="Place">Suzhou</ElDescriptionsItem>
                <ElDescriptionsItem label="Remarks">
                    <ElTag size="small">School</ElTag>
                </ElDescriptionsItem>
                <ElDescriptionsItem label="Address">No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province</ElDescriptionsItem>
            </ElDescriptions>
        </div>
    );
};

export default App;
