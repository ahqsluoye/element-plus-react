import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { computeInsertionIndex, insertionToTargetIndex } from '../hooks/useRowDrag';
import ElTable from '../Table';
import ElTableColumn from '../TableColumn';

const rowData = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' },
];

const renderTable = (props: Record<string, any> = {}, columns?: React.ReactElement) => {
    return render(
        <ElTable data={rowData} rowKey="id" {...props}>
            {columns ?? <ElTableColumn prop="name" label="Name" />}
        </ElTable>,
    );
};

const getRows = (container: HTMLElement) => Array.from(container.querySelectorAll('.el-table__body tbody tr'));

describe('computeInsertionIndex', () => {
    const rects = [
        { top: 0, height: 40 },
        { top: 40, height: 40 },
        { top: 80, height: 40 },
    ];

    it('指针在行上半区时返回该行下标（插入到该行之前）', () => {
        expect(computeInsertionIndex(10, rects)).toBe(0);
        expect(computeInsertionIndex(50, rects)).toBe(1);
        expect(computeInsertionIndex(90, rects)).toBe(2);
    });

    it('指针在行下半区时返回下一行下标（插入到该行之后）', () => {
        expect(computeInsertionIndex(30, rects)).toBe(1);
        expect(computeInsertionIndex(70, rects)).toBe(2);
    });

    it('指针超出末尾时返回行总数（追加到末尾）', () => {
        expect(computeInsertionIndex(500, rects)).toBe(3);
    });

    it('空数组返回 0', () => {
        expect(computeInsertionIndex(100, [])).toBe(0);
    });
});

describe('insertionToTargetIndex', () => {
    it('向下移动时换算为 arrayMove 目标下标（缝隙下标需减一）', () => {
        expect(insertionToTargetIndex(3, 0, 3)).toBe(2);
        expect(insertionToTargetIndex(2, 0, 3)).toBe(1);
    });

    it('向上移动时缝隙下标即目标下标', () => {
        expect(insertionToTargetIndex(0, 2, 3)).toBe(0);
        expect(insertionToTargetIndex(1, 2, 3)).toBe(1);
    });

    it('落点等于原位置或越界时返回 null（无效移动）', () => {
        expect(insertionToTargetIndex(0, 0, 3)).toBeNull();
        expect(insertionToTargetIndex(1, 0, 3)).toBeNull();
        expect(insertionToTargetIndex(3, 2, 3)).toBeNull();
        expect(insertionToTargetIndex(4, 0, 3)).toBeNull();
        expect(insertionToTargetIndex(-1, 0, 3)).toBeNull();
    });
});

describe('ElTable 行拖拽排序', () => {
    it('rowSortEnabled=true 时行可拖拽', () => {
        const { container } = renderTable({ rowSortEnabled: true });
        const rows = getRows(container);
        expect(rows).toHaveLength(3);
        rows.forEach(tr => expect(tr.getAttribute('draggable')).toBe('true'));
    });

    it('未开启 rowSortEnabled 时行不可拖拽', () => {
        const { container } = renderTable();
        getRows(container).forEach(tr => expect(tr.hasAttribute('draggable')).toBe(false));
    });

    it("rowSortEnabled='handle' 时仅手柄可拖拽且行不可拖拽", () => {
        const { container } = renderTable({ rowSortEnabled: 'handle' }, <ElTableColumn type="drag" width={48} />);
        const rows = getRows(container);
        rows.forEach(tr => expect(tr.hasAttribute('draggable')).toBe(false));
        const handle = container.querySelector('.el-table__row-drag-handle');
        expect(handle).not.toBeNull();
        expect(handle?.getAttribute('draggable')).toBe('true');
    });

    it('未开启 rowSortEnabled 时 type=drag 列不渲染手柄', () => {
        const { container } = renderTable({}, <ElTableColumn type="drag" width={48} />);
        expect(container.querySelector('.el-table__row-drag-handle')).toBeNull();
    });

    it('单行数据时不启用行拖拽', () => {
        const { container } = render(
            <ElTable data={[{ id: 1, name: 'A' }]} rowKey="id" rowSortEnabled>
                <ElTableColumn prop="name" label="Name" />
            </ElTable>,
        );
        getRows(container).forEach(tr => expect(tr.hasAttribute('draggable')).toBe(false));
    });

    it('树形表格不启用行拖拽', () => {
        const treeData = [
            { id: 1, name: 'A', children: [{ id: 11, name: 'A-1' }] },
            { id: 2, name: 'B' },
        ];
        const { container } = render(
            <ElTable data={treeData} rowKey="id" rowSortEnabled defaultExpandAll>
                <ElTableColumn prop="name" label="Name" />
            </ElTable>,
        );
        getRows(container).forEach(tr => expect(tr.hasAttribute('draggable')).toBe(false));
    });

    it('完整拖拽流程：创建拖拽图像 → 显示指示线 → 释放后重排数据并触发 onRowSortChange', async () => {
        const onRowSortChange = vi.fn();
        const { container } = renderTable({ rowSortEnabled: true, onRowSortChange });

        const rows = getRows(container);
        // 从第一行发起拖拽
        fireEvent.dragStart(rows[0]);
        // 自定义拖拽图像（克隆行）已挂载到 body
        expect(document.querySelector('.el-table__row-drag-ghost')).not.toBeNull();
        // 源行高亮
        expect(rows[0].className).toContain('is-dragging');

        // 拖拽经过表格（全局捕获监听 + rAF 节流后更新指示线）
        fireEvent.dragOver(container.querySelector('.el-table__body')!, { clientY: 100, clientX: 50 });
        const proxy = container.querySelector('.el-table__row-drag-proxy') as HTMLElement;
        await waitFor(() => expect(proxy.style.display).toBe('block'));

        // 释放：全局 drop 处理器执行重排
        fireEvent.drop(rows[2]);

        // onRowSortChange 收到重排后的数据与拖拽详情
        await waitFor(() => expect(onRowSortChange).toHaveBeenCalled());
        const [nextData, detail] = onRowSortChange.mock.calls[0];
        expect(nextData.map((item: { name: string }) => item.name)).toEqual(['B', 'C', 'A']);
        expect(detail).toEqual({ fromIndex: 0, toIndex: 2, row: rowData[0] });

        // 拖拽图像被移除、指示线隐藏、源行高亮清除
        await waitFor(() => expect(document.querySelector('.el-table__row-drag-ghost')).toBeNull());
        expect(proxy.style.display).toBe('none');

        // 表格按新顺序渲染（rowKey 稳定 key，React 移动 DOM 节点）
        await waitFor(() => expect(getRows(container)[0].textContent).toContain('B'));
    });

    it('拖拽中断（dragend）时清理所有拖拽反馈', async () => {
        const onRowSortChange = vi.fn();
        const { container } = renderTable({ rowSortEnabled: true, onRowSortChange });

        const rows = getRows(container);
        fireEvent.dragStart(rows[0]);
        expect(document.querySelector('.el-table__row-drag-ghost')).not.toBeNull();

        // 中断拖拽（如按下 Esc 触发 dragend）
        fireEvent.dragEnd(rows[0]);

        await waitFor(() => expect(document.querySelector('.el-table__row-drag-ghost')).toBeNull());
        expect(onRowSortChange).not.toHaveBeenCalled();
        expect(rows[0].className).not.toContain('is-dragging');
    });
});
