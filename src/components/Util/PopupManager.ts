const PopupManager: {
    zIndex: number;
    nextZIndex: () => number;
} = {
    zIndex: 10000,
    nextZIndex: () => ++PopupManager.zIndex,
};

export default PopupManager;
