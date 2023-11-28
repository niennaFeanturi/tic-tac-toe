from tkinter import *
from tkinter import messagebox

Player1 = 'X'
stop_game = False

def clicked(r, c):
    global Player1, stop_game

    if Player1 == "X" and states[r][c] == 0 and not stop_game:
        b[r][c].configure(text="X")
        states[r][c] = 'X'
        Player1 = 'O'

    elif Player1 == 'O' and states[r][c] == 0 and not stop_game:
        b[r][c].configure(text='O')
        states[r][c] = 'O'
        Player1 = 'X'

    check_if_win()

def check_if_win():
    global stop_game

    for i in range(3):
        if states[i][0] == states[i][1] == states[i][2] != 0:
            stop_game = True
            winner = messagebox.showinfo("Winner", states[i][0] + " Won")
            break

        elif states[0][i] == states[1][i] == states[2][i] != 0:
            stop_game = True
            winner = messagebox.showinfo("Winner", states[0][i] + " Won!")
            break

        elif states[0][0] == states[1][1] == states[2][2] != 0:
            stop_game = True
            winner = messagebox.showinfo("Winner", states[0][0] + " Won!")

        elif states[0][2] == states[1][1] == states[2][0] != 0:
            stop_game = True
            winner = messagebox.showinfo("Winner", states[0][2] + " Won!")

        elif all(states[i][j] != 0 for i in range(3) for j in range(3)):
            stop_game = True
            winner = messagebox.showinfo("Tie", "It's a Tie")

# Design window
root = Tk()
root.title("Tic Tac Toe")
root.resizable(0, 0)

# Button matrix and state matrix initialization
b = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
states = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

# Creating buttons and arranging them on the grid
for i in range(3):
    for j in range(3):
        b[i][j] = Button(height=4, width=8, font=("Helvetica", "20"), command=lambda r=i, c=j: clicked(r, c))
        b[i][j].grid(row=i, column=j)

# Running the main event loop
mainloop()
