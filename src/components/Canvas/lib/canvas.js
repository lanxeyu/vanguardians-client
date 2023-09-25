export function initCanvas() {
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')

    canvas.width = 1366
    canvas.height = 768

    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

}
