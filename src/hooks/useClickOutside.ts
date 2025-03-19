import forIn from 'lodash/forIn';
import { RefObject, useEffect, useLayoutEffect } from 'react';
import { randomCode } from '../Util';

type DocumentHandler = <T extends MouseEvent>(mouseup: T, mousedown: T) => void;

type FlushList = Record<
    string,
    {
        documentHandler: DocumentHandler;
        bindingFn: (...args: unknown[]) => unknown;
    }
>;

interface DirectiveBinding<V = any> {
    popperRef: HTMLDivElement;
    value: V;
    arg?: string;
    visible?: boolean;
}

const nodeList: FlushList = {};
let startClick: MouseEvent;
let init = false;

function createDocumentHandler(el: HTMLElement, binding: DirectiveBinding): DocumentHandler {
    let excludes: HTMLElement[] = [];
    if (Array.isArray(binding.arg)) {
        excludes = binding.arg;
    } else {
        // due to current implementation on binding type is wrong the type casting is necessary here
        excludes.push(binding.arg as unknown as HTMLElement);
    }
    return function (mouseup, mousedown) {
        if (mouseup && mousedown) {
            const popperRef = binding.popperRef;
            const mouseUpTarget = mouseup.target as Node;
            const mouseDownTarget = mousedown.target as Node;
            const isBound = !binding;
            const isTargetExists = !mouseUpTarget || !mouseDownTarget;
            const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
            const isSelf = el === mouseUpTarget;

            const isTargetExcluded =
                (excludes.length && excludes.some(item => item?.contains(mouseUpTarget))) || (excludes.length && excludes.includes(mouseDownTarget as HTMLElement));
            const isContainedByPopper = popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget));
            if (isBound || isTargetExists || isContainedByEl || isSelf || isTargetExcluded || isContainedByPopper) {
                return;
            }
            binding.value();
        }
    };
}

const useClickOutside = (el: RefObject<HTMLElement>, binding: DirectiveBinding) => {
    if (!init) {
        window.addEventListener('mousedown', (e: MouseEvent) => (startClick = e));
        window.addEventListener('mouseup', (e: MouseEvent) => {
            forIn(nodeList, ({ documentHandler }) => {
                documentHandler(e, startClick);
            });
        });
        init = true;
    }

    useLayoutEffect(() => {
        if (el.current && binding.popperRef) {
            if (!(el.current instanceof HTMLElement)) {
                return;
            }
            const index = randomCode(11);
            el.current.dataset.index = index;
            nodeList[index] = {
                documentHandler: createDocumentHandler(el.current, binding),
                bindingFn: binding.value,
            };
            return () => {
                delete nodeList[index];
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [binding.popperRef]);

    useEffect(() => {
        if (el.current && binding.visible) {
            if (!(el.current instanceof HTMLElement)) {
                return;
            }
            const index = randomCode(11);
            el.current.dataset.index = index;
            nodeList[index] = {
                documentHandler: createDocumentHandler(el.current, binding),
                bindingFn: binding.value,
            };
        } else {
            const index = el.current?.dataset?.index;
            if (index) {
                delete nodeList[index];
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [binding.visible]);
};

export default useClickOutside;
