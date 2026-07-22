import type { DropdownRef } from '@qsxy/element-plus-react';
import { ElCard, ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon } from '@qsxy/element-plus-react';
import React, { useMemo, useRef, useState } from 'react';
import './virtual-trigger.scss';

const App = () => {
    const dropdownRef = useRef<DropdownRef>(null);
    const [position, setPosition] = useState({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    } as DOMRect);

    const triggerRef = useMemo(
        () => ({
            getBoundingClientRect: () => position,
        }),
        [position],
    );

    const handleClick = () => {
        dropdownRef.current?.handleClose();
    };

    const handleContextmenu = event => {
        const { clientX, clientY } = event;
        setPosition(
            DOMRect.fromRect({
                x: clientX,
                y: clientY,
            }),
        );
        event.preventDefault();
        dropdownRef.current?.handleOpen();
    };

    return (
        <>
            <ElCard className="dropdown-virtual-trigger-content" bodyClass="card-body" onClick={handleClick} onContextMenu={handleContextmenu}>
                Right click
            </ElCard>
            <ElDropdown
                ref={dropdownRef}
                virtualRef={triggerRef}
                showArrow={false}
                // popperOptions={{
                //     modifiers: [{ name: 'offset', options: { offset: [0, 0] } }],
                // }}
                virtualTriggering
                trigger="contextmenu"
                placement="bottom-start"
                menu={
                    <ElDropdownMenu>
                        <ElDropdownItem>
                            <ElIcon name="plus" /> Action 1
                        </ElDropdownItem>
                        <ElDropdownItem>
                            <ElIcon name="circle-plus" /> Action 2
                        </ElDropdownItem>
                        <ElDropdownItem>
                            <ElIcon name="circle-plus" prefix="fas" /> Action 3
                        </ElDropdownItem>
                        <ElDropdownItem>
                            <ElIcon name="check" /> Action 4
                        </ElDropdownItem>
                        <ElDropdownItem>
                            <ElIcon name="circle-check" /> Action 5
                        </ElDropdownItem>
                    </ElDropdownMenu>
                }
            ></ElDropdown>
        </>
    );
};

export default App;
