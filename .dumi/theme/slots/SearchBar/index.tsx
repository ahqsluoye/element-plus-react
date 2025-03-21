import { IconArrowDown, IconArrowUp, IconSearch } from '@qsxy/element-plus-react';
import { useSiteSearch } from 'dumi';
import React, { useEffect, useRef, useState, type FC } from 'react';
import SearchResult from '../SearchResult';
import { Input } from './Input';
import { Mask } from './Mask';
import './index.less';
export { Input as SearchInput } from './Input';
export { Mask as SearchMask } from './Mask';

const isAppleDevice = /(mac|iphone|ipod|ipad)/i.test(typeof navigator !== 'undefined' ? navigator?.platform : '');

const SearchBar: FC = () => {
    const [focusing, setFocusing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const modalInputRef = useRef<HTMLInputElement>(null);
    const [symbol, setSymbol] = useState('⌘');
    const { keywords, setKeywords, result, loading } = useSiteSearch();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        // why put useEffect?
        // to avoid Text content mismatch between server & client in ssr
        if (!isAppleDevice) {
            setSymbol('Ctrl');
        }

        const handler = (ev: KeyboardEvent) => {
            if (((isAppleDevice ? ev.metaKey : ev.ctrlKey) && ev.key === 'k') || ev.key === '/') {
                ev.preventDefault();

                if (inputRef.current) {
                    const { top, bottom, left, right } = inputRef.current.getBoundingClientRect();
                    const isInViewport = top >= 0 && left >= 0 && bottom <= window.innerHeight && right <= window.innerWidth;

                    if (isInViewport) {
                        inputRef.current.focus();
                    } else {
                        setKeywords('');
                        setModalVisible(true);
                        setTimeout(() => {
                            modalInputRef.current?.focus();
                        });
                    }
                }
            }

            if (ev.key === 'Escape') {
                ev.preventDefault();
                setModalVisible(false);
            }
        };

        document.addEventListener('keydown', handler);

        return () => document.removeEventListener('keydown', handler);
    }, []);

    return (
        <div className="dumi-default-search-bar">
            <IconSearch className="dumi-default-search-bar-svg" />
            <Input
                onFocus={() => setFocusing(true)}
                onBlur={() => {
                    // wait for item click
                    setTimeout(() => {
                        setFocusing(false);
                    }, 1);
                }}
                onChange={keywords => setKeywords(keywords)}
                ref={inputRef}
            />
            <span className="dumi-default-search-shortcut">{symbol} K</span>
            {keywords.trim() && focusing && (result.length || !loading) && !modalVisible && (
                <div className="dumi-default-search-popover">
                    <section>
                        <SearchResult data={result} loading={loading} />
                    </section>
                </div>
            )}

            <Mask
                visible={modalVisible}
                onMaskClick={() => {
                    setModalVisible(false);
                }}
                onClose={() => setKeywords('')}
            >
                <div style={{ position: 'relative' }}>
                    <IconSearch className="dumi-default-search-bar-svg" />
                    <Input
                        onFocus={() => setFocusing(true)}
                        onBlur={() => {
                            // wait for item click
                            setTimeout(() => {
                                setFocusing(false);
                            }, 1);
                        }}
                        onChange={keywords => setKeywords(keywords)}
                        ref={modalInputRef}
                    />
                </div>

                <SearchResult
                    data={result}
                    loading={loading}
                    onItemSelect={() => {
                        setModalVisible(false);
                    }}
                />

                <footer>
                    <ul className="dumi-default-search-modal-commands">
                        <li className="dumi-default-search-modal-commands-arrow">
                            <span className="dumi-default-search-modal-shortcut">
                                <IconArrowUp width="10px" height="10px" fill="rgba(0, 0, 0, 0.45)" />
                            </span>
                            <span className="dumi-default-search-modal-shortcut">
                                <IconArrowDown width="10px" height="10px" fill="rgba(0, 0, 0, 0.45)" />
                            </span>
                            <span className="dumi-default-search-modal-commands-text">to navigate</span>
                        </li>
                        <li>
                            <span className="dumi-default-search-modal-shortcut">esc</span>
                            <span className="dumi-default-search-modal-commands-text">to close</span>
                        </li>
                    </ul>
                </footer>
            </Mask>
        </div>
    );
};

export default SearchBar;
