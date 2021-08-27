class Cell {
    constructor(ctx, x, y, w, h, alive = false, color = null) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.borders = true
        this.color = color
        // this.alive = Math.random() < 0.1 ? true : false
        this.alive = alive
        this.nextAliveState = null
        this.neighbors = []
        // this.deadColor = p.color(25, 42, 86)
        // this.aliveColor = p.color(29, 209, 161)
        this.deadColor = '#192a56'
        this.aliveColor = '#1dd1a1'
    }

    setNeighbors(neighborsArr) {
        this.neighbors = neighborsArr
    }

    calculateNextState() {
        let aliveCount = 0

        this.neighbors.forEach(neighbor => {
            if (neighbor.alive) {
                aliveCount++
            }
        })

        if (this.alive) {
            if (aliveCount === 2 || aliveCount === 3) {
                this.nextAliveState = true
            } else {
                this.nextAliveState = false
            }
        } else {
            if (aliveCount === 3) {
                this.nextAliveState = true
            }
        }
    }

    setNextState() {
        // if (this.nextAliveState !== this.alive) {
            // this.ctx.clearRect(this.x, this.y, this.w, this.h)
            if (this.alive !== this.nextAliveState) {
                this.alive = this.nextAliveState
                this.draw()
            }
        // }
    }

    draw() {
        // console.log(this.ctx)
        // console.log('cell draw')
        this.ctx.fillStyle = this.alive ? this.aliveColor : this.deadColor
        // this.ctx.beginPath();
        // this.ctx.ellipse(this.x + this.w/2, this.y + this.h/2, this.w/2, this.h/2, 0, 0, Math.PI*2)
        // this.ctx.fill();
        if (this.borders) {
            this.ctx.fillRect(this.x+1, this.y+1, this.w-2, this.h-2)
        } else {
            this.ctx.fillRect(this.x, this.y, this.w, this.h)
        }
    }
}

export default Cell;