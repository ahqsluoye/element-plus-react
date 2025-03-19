import classNames from 'classnames';
import React from 'react';

interface Props {
    className?: string;
}

function LeftLayerSvg({ className }: Props) {
    return (
        <svg
            className="left-layer-svg"
            width="262"
            height="173"
            viewBox="0 0 262 173"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-v-289a1ee8=""
            style={{
                position: 'absolute',
                width: '20%',
                height: '20%',
                transition: 'all 0.3s ease-out 0s',
                transform: 'translateX(202.049px) translateY(215.339px)',
            }}
        >
            <g clipPath="url(#clip0_11237_126796)" data-v-289a1ee8="">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.66289 1.92664C3.21061 1.92664 1.22266 3.9146 1.22266 6.36687V155.114C1.22266 157.567 3.21061 159.555 5.66289 159.555H173.559L186.602 172.32L199.09 159.555H256.536C258.988 159.555 260.976 157.567 260.976 155.114V6.36688C260.976 3.9146 258.988 1.92664 256.536 1.92664H5.66289Z"
                    fill="var(--ll-c-0)"
                    data-v-289a1ee8=""
                ></path>
                <path
                    d="M80.8689 23.0177H38.1317C32.1543 23.0177 27.3086 27.8633 27.3086 33.8407C27.3086 39.8182 32.1543 44.6638 38.1317 44.6638H80.8689C86.8463 44.6638 91.692 39.8182 91.692 33.8407C91.692 27.8633 86.8463 23.0177 80.8689 23.0177Z"
                    fill="#C7DCFB"
                    data-v-289a1ee8=""
                ></path>
                <path
                    d="M230.449 64.0898H31.7488C29.2966 64.0898 27.3086 66.0778 27.3086 68.5301V81.2957C27.3086 83.748 29.2966 85.7359 31.7488 85.7359H230.449C232.902 85.7359 234.89 83.748 234.89 81.2957V68.5301C234.89 66.0778 232.902 64.0898 230.449 64.0898Z"
                    fill="#A2C5F9"
                    data-v-289a1ee8=""
                ></path>
                <path
                    d="M230.449 103.497H31.7488C29.2966 103.497 27.3086 105.485 27.3086 107.938V120.703C27.3086 123.156 29.2966 125.144 31.7488 125.144H230.449C232.902 125.144 234.89 123.156 234.89 120.703V107.938C234.89 105.485 232.902 103.497 230.449 103.497Z"
                    fill="#A2C5F9"
                    data-v-289a1ee8=""
                ></path>
            </g>
            <defs data-v-289a1ee8="">
                <clipPath id="clip0_11237_126796" data-v-289a1ee8="">
                    <rect width="261" height="172" fill="white" transform="translate(0.491211 0.941406)" data-v-289a1ee8=""></rect>
                </clipPath>
            </defs>
        </svg>
    );
}

export default LeftLayerSvg;
