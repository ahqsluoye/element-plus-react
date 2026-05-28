import classNames from 'classnames';
import omit from 'lodash/omit';
import React, { useEffect } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { useClassNames } from '../hooks';
import { useTourContext } from './context';
import type { TourBtnProps, TourStepProps } from './typings';

function Step(props: TourStepProps) {
    const ns = useClassNames('tour');
    const { current, total, showClose: tourShowClose, closeIcon, mergedType, indicators, onPrev, onNext, onClose } = useTourContext();

    const mergedShowClose = props.showClose ?? tourShowClose;

    const filterButtonProps = (btnProps?: TourBtnProps) => {
        if (!btnProps) {
            return undefined;
        }
        return omit(btnProps, ['children', 'onClick']);
    };

    const handlePrev = () => {
        if (props.prevButtonProps?.onClick) {
            props.prevButtonProps.onClick();
        }
        onPrev();
    };

    const handleNext = () => {
        if (props.nextButtonProps?.onClick) {
            props.nextButtonProps.onClick();
        }
        onNext();
    };

    const handleClose = () => {
        onClose();
        if (props.onClose) {
            props.onClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            if (target?.isContentEditable) {
                return;
            }

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    if (current > 0) {
                        onPrev();
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    onNext();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [current, onPrev, onNext]);

    return (
        <>
            {mergedShowClose && (
                <button aria-label="Close tour" className={ns.e('closebtn')} type="button" onClick={handleClose}>
                    <Icon className={ns.e('close')} name={closeIcon} />
                </button>
            )}
            <header className={classNames(ns.e('header'), { 'show-close': mergedShowClose })}>
                {props.header || (
                    <span role="heading" className={ns.e('title')}>
                        {props.title}
                    </span>
                )}
            </header>
            <div className={ns.e('body')}>{props.children || <span>{props.description}</span>}</div>
            <footer className={ns.e('footer')}>
                <div className={ns.b('indicators')}>
                    {indicators
                        ? indicators({ current, total })
                        : Array.from({ length: total }).map((_, index) => <span key={index} className={classNames(ns.b('indicator'), ns.is('active', index === current))} />)}
                </div>
                <div className={ns.b('buttons')}>
                    {current > 0 && (
                        <Button size="small" type={mergedType as any} {...filterButtonProps(props.prevButtonProps)} onClick={handlePrev}>
                            {(props.prevButtonProps?.children as React.ReactNode) ?? 'Previous'}
                        </Button>
                    )}
                    {current <= total - 1 && (
                        <Button size="small" type={mergedType === 'primary' ? 'default' : 'primary'} {...filterButtonProps(props.nextButtonProps)} onClick={handleNext}>
                            {(props.nextButtonProps?.children as React.ReactNode) ?? (current === total - 1 ? 'Finish' : 'Next')}
                        </Button>
                    )}
                </div>
            </footer>
        </>
    );
}

Step.displayName = 'ElTourStep';

export default Step;
