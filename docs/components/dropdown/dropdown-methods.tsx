import { ElButton, ElDropdown, ElDropdownItem, ElDropdownMenu, ElLink, type DropdownRef } from '@qsxy/element-plus-react';
import React, { useRef } from 'react';

const App = () => {
    const dropdown1 = useRef<DropdownRef>(null);

    function handleVisible2(visible) {
        console.log(visible);
        if (!dropdown1.current) return;
        if (visible) {
            dropdown1.current.handleClose();
        } else {
            dropdown1.current.handleOpen();
        }
    }
    function showClick() {
        if (!dropdown1.current) return;
        dropdown1.current.handleOpen();
    }

    return (
        <>
            <div style={{ fontSize: 14 }}>
                <p>open(close) the Dropdown list2 will close(open) the Dropdown List1.</p>
            </div>
            <div style={{ margin: 15 }}>
                <ElButton onClick={showClick}>show</ElButton>
            </div>
            <ElDropdown
                ref={dropdown1}
                trigger="contextmenu"
                menu={
                    <ElDropdownMenu>
                        <ElDropdownItem>Action 1</ElDropdownItem>
                        <ElDropdownItem>Action 2</ElDropdownItem>
                        <ElDropdownItem>Action 3</ElDropdownItem>
                        <ElDropdownItem disabled>Action 4</ElDropdownItem>
                        <ElDropdownItem divided>Action 5</ElDropdownItem>
                    </ElDropdownMenu>
                }
                style={{ marginRight: 30 }}
            >
                <ElLink type="primary" underline="never">
                    Dropdown List1
                </ElLink>
            </ElDropdown>

            <ElDropdown
                trigger="contextmenu"
                onVisibleChange={handleVisible2}
                menu={
                    <ElDropdownMenu>
                        <ElDropdownItem>Action 1</ElDropdownItem>
                        <ElDropdownItem>Action 2</ElDropdownItem>
                        <ElDropdownItem>Action 3</ElDropdownItem>
                        <ElDropdownItem disabled>Action 4</ElDropdownItem>
                        <ElDropdownItem divided>Action 5</ElDropdownItem>
                    </ElDropdownMenu>
                }
                style={{ marginRight: 30 }}
            >
                <ElLink type="primary" underline="never">
                    Dropdown List2
                </ElLink>
            </ElDropdown>
        </>
    );
};

export default App;
