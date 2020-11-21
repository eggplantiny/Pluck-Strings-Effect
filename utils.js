export function distance (x1, y1, x2, y2) {
    const x = x2 - x1
    const y = y2 - y1
    return Math.sqrt(x * x + y * y)
}

export function lineCircle (x1, y1, x2, y2, cx, cy, r) {
    const lineLength = distance(x1, y1, x2, y2)
    const point = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / Math.pow(lineLength, 2)

    const px = x1 + (point * (x2 - x1))
    const py = y1 + (point * (y2 - y1))

    return distance(px, py, cx, cy) < r
}
export function getRandomArbitrary (min, max) {
    return Math.random() * (max - min) + min
}

export function getRandomInt (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getPoissonRandomNumber (lambda) {
    let L = Math.exp(-lambda)
    let k = 0
    let p = 1

    do {
        k = k + 1
        p = p * Math.random()
    } while (p > L)

    return k - 1
}

export function getExponentiallyUniform (min = 400, max = 600) {
    return getPoissonRandomNumber(getRandomInt(min, max))
}
