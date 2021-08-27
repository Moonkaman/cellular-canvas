import Cell from './Cell'

class CellGrid {
    constructor(ctx, width, height, numCols, numRows) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.numRows = numRows
        this.numCols = numCols

        this.cells = []

        this.cellWidth = this.width / this.numRows
        this.cellHeight = this.height / this.numCols

        
    }

    randomizeGrid() {
        this.cells.forEach(cell => {
            cell.alive = Math.random() < 0.5 ? false : true
        })
    }

    clearGrid() {
        this.cells.forEach(cell => {
            cell.alive = false
            cell.nextAliveState = false
        })
    }

    calculateNeighbors() {
        for(let i = 0; i < this.cells.length; i++) {
            const cell = this.cells[i]

            const neighbors = [
                this.cells[i - this.numRows],
                this.cells[i - this.numRows +  1],
                this.cells[i + 1],
                this.cells[i + this.numRows + 1],
                this.cells[i + this.numRows],
                this.cells[i + this.numRows - 1],
                this.cells[i - 1],
                this.cells[i - this.numRows - 1]
            ]

            if (cell.x === 0) {
                neighbors[5] = this.cells[i + this.numRows * 2 - 1]
                neighbors[6] = this.cells[i + this.numRows - 1]
                neighbors[7] = this.cells[i-1]
            }

            if (cell.x === this.width - this.cellWidth) {
                neighbors[1] = this.cells[i - this.numRows * 2 + 1]
                neighbors[2] = this.cells[i - this.numRows + 1]
                neighbors[3] = this.cells[i + 1]
            }

            if (cell.y === 0) {
                neighbors[0] = this.cells[i + (this.numRows * (this.numCols - 1))]
                neighbors[1] = this.cells[i + (this.numRows * (this.numCols - 1)) + 1]
                neighbors[7] = this.cells[i + (this.numRows * (this.numCols - 1)) - 1]
            }

            if (cell.y === this.height - this.cellHeight) {
                neighbors[3] = this.cells[i - (this.numRows * (this.numCols - 1)) + 1]
                neighbors[4] = this.cells[i - (this.numRows * (this.numCols - 1))]
                neighbors[5] = this.cells[i - (this.numRows * (this.numCols - 1)) - 1]
            }

            /*
            [
                0: n,
                1: ne,
                2: e,
                3: se,
                4: s,
                5: sw,
                6: w,
                7: nw
            ]
            */

            if (cell.y === 0 && cell.x === 0) {
                neighbors[7] = this.cells[this.cells.length - 1]
            }

            if (cell.y === 0 && cell.x === this.width - this.cellWidth) {
                neighbors[1] = this.cells[this.numRows * (this.numCols - 1)]
            }

            if (cell.y === this.height - this.cellHeight && cell.x === this.width - this.cellWidth) {
                neighbors[3] = this.cells[0]
            }

            if (cell.y === this.height - this.cellHeight && cell.x === 0) {
                neighbors[5] = this.cells[this.numRows - 1]
            }

            cell.setNeighbors(neighbors)
        }
    }

    setup() {
        for(let y = 0; y < this.numCols; y++) {
            for(let x = 0; x < this.numRows; x++) {
                this.cells.push(new Cell(this.ctx, x*this.cellWidth, y*this.cellHeight, this.cellWidth, this.cellHeight))
            }
        }

        this.calculateNeighbors()
    }

    draw() {
        for(let i = 0; i < this.cells.length; i++) {
            // if (this.cells[i].alive) {
                this.cells[i].draw()
            // }
        }
    }

    calculateNextState() {
        this.cells.forEach(cell => {
            cell.calculateNextState()
        })

        this.cells.forEach(cell => {
            cell.setNextState()
        })
    }

    click(mouseX, mouseY) {
        for(let i = 0; i < this.cells.length; i++) {
            const cell = this.cells[i]
            if (mouseX >= cell.x && mouseX <= cell.x + cell.w && mouseY >= cell.y && mouseY <= cell.y + cell.h) {
                cell.alive = !cell.alive
                console.log(`Index: ${i} X: ${cell.x} Y: ${cell.y}`)
            }
        }
    }
}

export default CellGrid