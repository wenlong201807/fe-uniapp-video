export const isSingleLine = (text, width) => {
    const words = text.split(' ')
    const wordWidths = words.map((word) => word.length * 10) // assuming an average character width of 10px
    const totalWidth = wordWidths.reduce((a, b) => a + b, 0)
    return totalWidth <= width
}
