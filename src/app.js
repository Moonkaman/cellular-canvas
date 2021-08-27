import CellGrid from './classes/CellGrid'

const canvas = document.querySelector("#cellCanvas")
const ctx = canvas.getContext('2d')

const cellGrid = new CellGrid(ctx, canvas.width, canvas.height, 20, 20)

let paused = true

const playBtn = document.querySelector('#playBtn')
const forwardFrameBtn = document.querySelector('#forwardFrame')
const randomizeBtn = document.querySelector('#randomBtn')
const clearBtn = document.querySelector('#clearBtn')

playBtn.addEventListener('click', e => {
    paused = !paused
    playBtn.textContent = paused ? 'Play' : 'Pause'
})

cellGrid.setup()

randomizeBtn.addEventListener('click', e => {
    cellGrid.randomizeGrid()
    cellGrid.draw()
})

clearBtn.addEventListener('click', e => {
    cellGrid.clearGrid()
    cellGrid.draw()
})

forwardFrameBtn.addEventListener('click', e => {
    if (!paused) return;

    cellGrid.calculateNextState()
})

canvas.addEventListener('click', e => {
    console.log(e)
    cellGrid.click(e.offsetX, e.offsetY)
    cellGrid.draw()
})

cellGrid.draw()

function draw() {
    

    if (!paused) {
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        cellGrid.calculateNextState()
    }

    window.requestAnimationFrame(draw)
}

draw()