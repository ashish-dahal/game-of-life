size = 100;

row_size = size;
col_size = size;
var frame_switch;
on = 0;
generation = 0;
frame = new Array(row_size);
for (i = 0; i < row_size; i++) {
    frame[i] = new Array(col_size).fill(0)
}

empty_frame = JSON.parse(JSON.stringify(frame));


// frame[3][3] = 1;
// frame[2][3] = 1;
// frame[2][2] = 1;
// frame[3][2] = 1;
// frame = getRndArray(0, 1)

window.onload = () => {
    document.getElementById("frame").style.minWidth = (row_size * 12) + "px";
    document.getElementById("frame").style.minHeight = (col_size * 12) + "px";
    document.getElementById("frame").style.width = (row_size * 12) + "px";
    document.getElementById("frame").style.height = (col_size * 12) + "px";
    render_frame(frame);
    document.getElementById("start").addEventListener("click", () => {
        if (!on) {
            frame_switch = setInterval(start, 300);
            on = 1;
            document.getElementById('status').innerHTML = on;
        }
    });
    document.getElementById("stop").addEventListener("click", () => {
        if (on) {
            clearInterval(frame_switch);
            on = 0;
            document.getElementById('status').innerHTML = on;
        }
    });
    document.getElementById("reset").addEventListener("click", () => {
        if (!on) {
            frame = getRndArray(0, 1);
            generation = 0;
            render_frame(frame);
        }
    });
    document.getElementById("clear").addEventListener("click", () => {
        if (!on) {
            frame = JSON.parse(JSON.stringify(empty_frame));
            generation = 0;
            render_frame(frame);
        }
    });
}

function render_frame(arr) {
    html_frame = document.getElementById('frame');
    div = ``;
    for (i = 0; i < row_size; i++) {
        for (j = 0; j < col_size; j++) {
            state = arr[i][j];
            style = ''
            if (state == 1) {
                style = 'style ="background: black"'
            }
            if (state == 0) {
                style = 'style ="background: white"'
            }
            div += `<div data-row="${i}" data-col="${j}" data-state="${state}" onclick="change_state(this);" ${style}></div>`;
        }
    }
    html_frame.innerHTML = div;
    document.getElementById('gen').innerHTML = generation++;
    document.getElementById('status').innerHTML = on;
}

function change_state(d) {
    row = d.getAttribute("data-row");
    col = d.getAttribute("data-col");
    state = d.getAttribute("data-state");
    if (d.style.backgroundColor == "white") {
        d.style.backgroundColor = "black";
    }
    else if (d.style.backgroundColor == "black") {
        d.style.backgroundColor = "white";
    }
    new_state = 1 - state;
    frame[row][col] = new_state;
    d.setAttribute("data-state", new_state);
}

function start() {
    var frame_copy = JSON.parse(JSON.stringify(frame));;
    for (i = 0; i < row_size; i++) {
        for (j = 0; j < col_size; j++) {
            neighbours = get_neighbours(i, j);
            state = frame[i][j];
            if (state == 1) {
                if (neighbours < 2 || neighbours > 3) {
                    frame_copy[i][j] = 0;
                }
                else {
                    frame_copy[i][j] = 1;
                }
            }
            else if (state == 0 && neighbours == 3) {
                frame_copy[i][j] = 1;
            }
        }
    }
    frame = JSON.parse(JSON.stringify(frame_copy));
    render_frame(frame);
}

function get_neighbours(i, j) {
    neighbours = 0;

    loop = [[i - 1, j - 1], [i - 1, j], [i - 1, j + 1], [i, j - 1], [i, j + 1], [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]];

    for (k = 0; k < loop.length; k++) {
        if (loop[k][0] >= 0 && loop[k][1] >= 0 && loop[k][0] < row_size && loop[k][1] < col_size) {
            neighbours += frame[loop[k][0]][loop[k][1]];
        }
    }

    return neighbours;
}

function getRndArray(min, max) {
    arr = JSON.parse(JSON.stringify(empty_frame));
    for (i = 0; i < row_size; i++) {
        for (j = 0; j < col_size; j++) {
            arr[i][j] = Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    return arr;
}
