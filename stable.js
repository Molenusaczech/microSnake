def on_button_pressed_a():
    global snakeDirection
    if snakeDirection == 0:
        snakeDirection = 3
    else:
        snakeDirection += -1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global snakeDirection
    if snakeDirection == 3:
        snakeDirection = 0
    else:
        snakeDirection += 1
input.on_button_pressed(Button.B, on_button_pressed_b)

tempY = 0
tempX = 0
lastY = 0
lastX = 0
snakeDirection = 0
snakeDirection = 1
headX = 2
headY = 2
SnakeCellsX = [1]
SnakeCellsY = [2]
fruitX = 3
fruitY = 3
led.plot_brightness(3, 3, 130)
fruitSet = 1
led.set_display_mode(DisplayMode.GREYSCALE)

def on_forever():
    global fruitX, fruitY, headY, headX, lastX, lastY, fruitSet, tempX, tempY
    index = 0
    while index <= len(SnakeCellsX):
        if SnakeCellsX[index] == headX:
            if SnakeCellsY[index] == headY:
                fruitX = -1
                fruitY = -1
                while True:
                    basic.show_string("Game Over!")
        index += 1
    if headX >= 5 or headY >= 5 or (headY <= -1 or headX <= -1):
        while True:
            fruitX = -1
            fruitY = -1
            basic.show_string("Game Over!")
    led.plot(headX, headY)
    SnakeCellsX.unshift(headX)
    SnakeCellsY.unshift(headY)
    control.wait_micros(1000000)
    if snakeDirection == 0:
        headY += -1
    elif snakeDirection == 1:
        headX += 1
    elif snakeDirection == 2:
        headY += 1
    elif snakeDirection == 3:
        headX += -1
    if not (headX == fruitX and headY == fruitY):
        lastX = SnakeCellsX.pop()
        lastY = SnakeCellsY.pop()
        led.unplot(lastX, lastY)
    else:
        fruitSet = 0
        while fruitSet == 0:
            tempX = randint(0, 4)
            tempY = randint(0, 4)
            if not (convert_to_text(SnakeCellsX).includes(convert_to_text(tempX)) and (convert_to_text(SnakeCellsY).includes(convert_to_text(tempY)) and (tempX == headX and tempY == headY))):
                fruitX = tempX
                fruitY = tempY
                led.plot_brightness(fruitX, fruitY, 130)
                fruitSet = 1
basic.forever(on_forever)

def on_forever2():
    pass
basic.forever(on_forever2)
