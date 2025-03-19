const PopupManager: {
    zIndex: number;
    nextZIndex: () => number;
} = {
    zIndex: 1000000000,
    nextZIndex: () => ++PopupManager.zIndex,
};

export default PopupManager;
