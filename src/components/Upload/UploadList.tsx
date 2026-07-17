import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useDisabled } from '@qsxy/element-plus-react/hooks/useCommonProps';
import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import ElProgress from '@qsxy/element-plus-react/Progress/Progress';
import ElTransition from '@qsxy/element-plus-react/Transition/Transition';
import classNames from 'classnames';
import React, { useCallback, useRef } from 'react';
import { UploadFile, UploadListProps } from './typings';

const UploadList = (props: UploadListProps) => {
    const { listType, files = [], handlePreview, onRemove, formatter, append } = props;
    const { b, bm, be, is } = useClassNames('upload');

    const disabled = useDisabled(props.disabled);
    const nodeRef = useRef(null);

    const handleRemove = useCallback(
        (file: UploadFile) => {
            onRemove?.(file);
        },
        [onRemove],
    );

    return (
        <ul className={classNames(b`list`, bm('list', listType), is({ disabled }))}>
            {files.map((file, i) => (
                <ElTransition nodeRef={nodeRef} key={`tr_${file.uid || file.name}${i}`} name={b('list', false)} visible transitionAppear unmountOnExit display="">
                    <li ref={nodeRef} key={`${file.uid || file.name}${i}`} className={classNames(be('list', 'item'), is(file.status) /* , { focusing } */)}>
                        {formatter ? (
                            formatter(file)
                        ) : (
                            <>
                                {(listType === 'picture' || (file.status !== 'uploading' && listType === 'picture-card')) && (
                                    <img className={be('list', 'item-thumbnail')} src={file.url} alt="" />
                                )}

                                {(file.status === 'uploading' || listType !== 'picture-card') && (
                                    <div className={be('list', 'item-info')}>
                                        <a
                                            className={be('list', 'item-name')}
                                            onClick={e => {
                                                e.preventDefault();
                                                handlePreview?.(file);
                                            }}
                                        >
                                            <ElIcon name="file-alt" className={bm('icon', 'document', false)} />
                                            <span className={be('list', 'item-file-name')}>{file.name}</span>
                                        </a>

                                        {file.status === 'uploading' && (
                                            <ElProgress
                                                type={listType === 'picture-card' ? 'circle' : 'line'}
                                                strokeWidth={listType === 'picture-card' ? 6 : 2}
                                                percentage={Number(file.percentage)}
                                                style={listType === 'picture-card' ? {} : { marginTop: '0.5rem' }}
                                            />
                                        )}
                                    </div>
                                )}

                                <label className={be('list', 'item-status-label')}>
                                    {listType === 'text' && (
                                        <ElIcon name="circle-check" className={classNames(bm('icon', 'upload-success', false), bm('icon', 'circle-check', false))} />
                                    )}
                                    {['picture-card', 'picture'].includes(listType) && (
                                        <ElIcon name="check" className={classNames(bm('icon', 'upload-success', false), bm('icon', 'check', false))} />
                                    )}
                                </label>

                                {!disabled && <ElIcon name="close" className={bm('icon', 'close', false)} onClick={() => handleRemove(file)} />}
                                {!disabled && (
                                    <ElIcon name="close" className={bm('icon', 'close-tip', false)}>
                                        点击删除
                                    </ElIcon>
                                )}

                                {listType === 'picture-card' && (
                                    <span className={be('list', 'item-actions')}>
                                        <span className={be('list', 'item-preview')} onClick={() => handlePreview(file)}>
                                            <ElIcon name="magnifying-glass-plus" className={bm('icon', 'zoom-in', false)} prefix="fal" />
                                        </span>
                                        {!disabled && (
                                            <span className={be('list', 'item-delete')} onClick={() => handleRemove(file)}>
                                                <ElIcon name="trash-alt" className={bm('icon', 'delete', false)} prefix="fal" />
                                            </span>
                                        )}
                                    </span>
                                )}
                            </>
                        )}
                    </li>
                </ElTransition>
            ))}
            {append}
        </ul>
    );
};

export default UploadList;
