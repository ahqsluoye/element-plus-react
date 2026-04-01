// import { RefObject } from 'react';
// import { EVENT_CODE } from '../../config/Constants';
// import { useClassNames } from '../../hooks';
// import TreeStore from './tree-store';

// interface UseKeydownOption {
//     elRef: RefObject<HTMLElement | null>;
// }
// export function useKeydown({ elRef }: UseKeydownOption, store: TreeStore) {
//     const ns = useClassNames('tree');

//     onMounted(() => {
//         initTabIndex();
//     });

//     onUpdated(() => {
//         elRef.current?.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
//             checkbox.setAttribute('tabindex', '-1');
//         });
//     });

//     function canNodeFocus(treeItems: HTMLElement[], nextIndex: number): boolean {
//         const currentNode = store.getNode(treeItems[nextIndex].dataset.key!);
//         return currentNode.canFocus && currentNode.visible && (currentNode.parent?.expanded || currentNode.parent?.level === 0);
//     }

//     const handleKeydown = (ev: KeyboardEvent): void => {
//         const currentItem = ev.target as HTMLDivElement;
//         if (!currentItem.className.includes(ns.b('node'))) {
//             return;
//         }
//         const code = getEventCode(ev);
//         const treeItems: HTMLElement[] = Array.from(elRef.current!.querySelectorAll(`.${ns.is('focusable')}[role=treeitem]`));
//         const currentIndex = treeItems.indexOf(currentItem);
//         let nextIndex;
//         if ([EVENT_CODE.up, EVENT_CODE.down].includes(code)) {
//             ev.preventDefault();
//             if (code === EVENT_CODE.up) {
//                 nextIndex = currentIndex === -1 ? 0 : currentIndex !== 0 ? currentIndex - 1 : treeItems.length - 1;
//                 const startIndex = nextIndex;
//                 while (true) {
//                     if (canNodeFocus(treeItems, nextIndex)) {
//                         break;
//                     }

//                     nextIndex--;
//                     if (nextIndex === startIndex) {
//                         nextIndex = -1;
//                         break;
//                     }
//                     if (nextIndex < 0) {
//                         nextIndex = treeItems.length - 1;
//                     }
//                 }
//             } else {
//                 nextIndex = currentIndex === -1 ? 0 : currentIndex < treeItems.length - 1 ? currentIndex + 1 : 0;
//                 const startIndex = nextIndex;
//                 while (true) {
//                     if (canNodeFocus(treeItems, nextIndex)) {
//                         break;
//                     }

//                     nextIndex++;
//                     if (nextIndex === startIndex) {
//                         nextIndex = -1;
//                         break;
//                     }
//                     if (nextIndex >= treeItems.length) {
//                         nextIndex = 0;
//                     }
//                 }
//             }
//             nextIndex !== -1 && treeItems[nextIndex].focus();
//         }
//         if ([EVENT_CODE.left, EVENT_CODE.right].includes(code)) {
//             ev.preventDefault();
//             currentItem.click();
//         }
//         const hasInput = currentItem.querySelector('[type="checkbox"]') as Nullable<HTMLInputElement>;
//         if ([EVENT_CODE.enter, EVENT_CODE.numpadEnter, EVENT_CODE.space].includes(code) && hasInput) {
//             ev.preventDefault();
//             hasInput.click();
//         }
//     };

//     elRef.current.addEventListener('keydown', handleKeydown);

//     const initTabIndex = (): void => {
//         if (!elRef.current) {
//             return;
//         }
//         const treeItems = Array.from(elRef.current.querySelectorAll(`.${ns.is('focusable')}[role=treeitem]`));
//         const checkboxItems = Array.from(elRef.current.querySelectorAll('input[type=checkbox]'));
//         checkboxItems.forEach(checkbox => {
//             checkbox.setAttribute('tabindex', '-1');
//         });
//         const checkedItem = elRef.current.querySelectorAll(`.${ns.is('checked')}[role=treeitem]`);
//         if (checkedItem.length) {
//             checkedItem[0].setAttribute('tabindex', '0');
//             return;
//         }
//         treeItems[0]?.setAttribute('tabindex', '0');
//     };
// }
