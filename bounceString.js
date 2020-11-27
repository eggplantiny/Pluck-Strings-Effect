import { lineCircle, getRandomArbitrary } from "./utils.js"

const BOUNCE = 0.9

export class BounceString {
    constructor (pos, color) {

        const middleX = ((pos.x2 - pos.x1) / 2) + pos.x1
        const middleY = ((pos.y2 - pos.y1) / 2) + pos.y1

        this.points = [
            { 
                x: pos.x1,
                y: pos.y1,
                ox: pos.x1,
                oy: pos.y1,
                vx: 0,
                vy: 0
            },
            { 
                x: middleX,
                y: middleY,
                ox: middleX,
                oy: middleY,
                vx: 0,
                vy: 0
            },
            { 
                x: pos.x2,
                y: pos.y2,
                ox: pos.x2,
                oy: pos.y2,
                vx: 0,
                vy: 0
            },
        ]

        this.detect = 10
        this.color = color
    }

    animate (ctx, moveX, moveY) {
        ctx.beginPath()
        ctx.fillStyle = '#fdcfdf'
        ctx.arc(moveX, moveY, 40, 0, Math.PI * 2, false)
        ctx.fill()

        ctx.beginPath()
        ctx.strokeStyle = this.color
        ctx.lineWidth = 4

        if (lineCircle(
            this.points[0].x,
            this.points[0].y,
            this.points[2].x,
            this.points[2].y,
            moveX,
            moveY,
            this.detect
        )) {
            this.detect = 300
            const tx = (this.points[1].ox + moveX) / 2
            const ty = moveY

            this.points[1].vx = tx - this.points[1].x
            this.points[1].vy = ty - this.points[1].y
        } else {
            this.detect = 10
            const tx = this.points[1].ox
            const ty = this.points[1].oy
            this.points[1].vx += tx - this.points[1].x
            this.points[1].vy *= getRandomArbitrary(-0.2, BOUNCE)
            this.points[1].vy += ty - this.points[1].y
            this.points[1].vy *= getRandomArbitrary(-0.2, BOUNCE)
        }

        this.points[1].x += this.points[1].vx
        this.points[1].y += this.points[1].vy

        let prevX = this.points[0].x
        let prevY = this.points[0].y

        ctx.moveTo(prevX, prevY)

        this.points.forEach(point => {
            const cx = (prevX + point.x) / 2
            const cy = (prevY + point.y) / 2

            ctx.quadraticCurveTo(prevX, prevY, cx, cy)

            prevX = point.x
            prevY = point.y
        })

        // for (let c = 0; c < this.points.length; c++) {
        //     const cx = (prevX + this.points[c].x) / 2
        //     const cy = (prevY + this.points[c].y) / 2

        //     ctx.quadraticCurveTo(prevX, prevY, cx, cy)

        //     prevX = this.points[c].x
        //     prevY = this.points[c].y
        // }
        
        ctx.lineTo(prevX, prevY)
        ctx.stroke()
    }
}