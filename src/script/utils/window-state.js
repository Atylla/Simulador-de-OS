let zIndexCounter = 1000;

export const getZIndex = () => {
    zIndexCounter++;
    return zIndexCounter;
};
