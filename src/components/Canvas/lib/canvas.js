export function initCanvas(canvas) {
    const context = canvas.getContext('2d')

    canvas.width = 1366
    canvas.height = 768

    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
}
