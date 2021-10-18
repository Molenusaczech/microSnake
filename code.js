input.onButtonPressed(Button.A, function () {
    if (snakeDirection == 0) {
        snakeDirection = 3
    } else {
        snakeDirection += -1
    }
})
input.onButtonPressed(Button.B, function () {
    if (snakeDirection == 3) {
        snakeDirection = 0
    } else {
        snakeDirection += 1
    }
})
let tempY = 0
let tempX = 0
let lastY = 0
let lastX = 0
let snakeDirection = 0
snakeDirection = 1
let headX = 2
let headY = 2
let SnakeCellsX = [1]
let SnakeCellsY = [2]
let fruitX = 3
let fruitY = 3
led.plotBrightness(3, 3, 130)
let fruitSet = 1
led.setDisplayMode(DisplayMode.Greyscale)
basic.forever(function () {
    for (let index = 0; index <= SnakeCellsX.length; index++) {
        if (SnakeCellsX[index] == headX) {
            if (SnakeCellsY[index] == headY) {
                while (true) {
                    basic.showString("Game Over!")
                }
            }
        }
    }
    if (headX >= 5 || headY >= 5 || (headY <= -1 || headX <= -1)) {
        while (true) {
            basic.showString("Game Over!")
        }
    }
    led.plot(headX, headY)
    SnakeCellsX.unshift(headX)
    SnakeCellsY.unshift(headY)
    control.waitMicros(1000000)
    if (snakeDirection == 0) {
        headY += -1
    } else if (snakeDirection == 1) {
        headX += 1
    } else if (snakeDirection == 2) {
        headY += 1
    } else if (snakeDirection == 3) {
        headX += -1
    }
    if (!(headX == fruitX && headY == fruitY)) {
        lastX = SnakeCellsX.pop()
        lastY = SnakeCellsY.pop()
        led.unplot(lastX, lastY)
    } else {
        fruitSet = 0
        while (fruitSet == 0) {
            tempX = randint(0, 4)
            tempY = randint(0, 4)
            if (!(convertToText(SnakeCellsX).includes(convertToText(tempX)) && (convertToText(SnakeCellsY).includes(convertToText(tempY)) && (tempX == headX && tempY == headY)))) {
                fruitX = tempX
                fruitY = tempY
                led.plotBrightness(fruitX, fruitY, 130)
                fruitSet = 1
            }
        }
    }
})
basic.forever(function () {
    led.plot(fruitX, fruitY)
    control.waitMicros(100000)
    led.unplot(fruitX, fruitY)
    control.waitMicros(100000)
})
