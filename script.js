const char2num = (x, y) => {
    const conf = {A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8};
    return [conf[x.toUpperCase()], parseInt(y)]
}

const num2char = (x, y) => {
    const conf = {1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F', 7: 'G', 8: 'H'};
    return [conf[x], y]
    // return [Object.keys(conf).find(key => conf[key] === x), y]
}
const xy2id = (x,y) =>  num2char(x,y).reduce((x,y) => x+y)

const getMovesChar = (x, y) => getMovesDig(...char2num(x, y)).map(step => num2char(...step));

const getMovesDig = (x, y) => {
    return [
        [x - 2, y - 1],
        [x - 2, y + 1],
        [x - 1, y - 2],
        [x - 1, y + 2],
        [x + 2, y - 1],
        [x + 2, y + 1],
        [x + 1, y - 2],
        [x + 1, y + 2],
    ]
        .filter(step => step[0] > 0 && step[1] > 0 && step[0] < 9 && step[1] < 9)
};

let selected = null;

const setCellColor = (x,y, color) => {

    const cell = document.getElementById(xy2id(x,y));
    console.log(cell);
    cell.classList.remove( ...['blue', 'green', 'white', 'black'] );
    cell.classList.add(color);
}

const clearColors = () => {
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            setCellColor(i,j,getCellColor(i, j) ? 'black' : 'white');
        }
    }
}


// Возвращает цвет: 0 - черный, 1 - белый
const getCellColor = (x, y) => (x + y) % 2;

const cellListener = (i,j) => {
    return () => {
        clearColors();
        const steps = getMovesDig(i,j);
        setCellColor(i,j,'blue');
        steps.forEach(step => setCellColor(...step,'green'));
    }

};

const createTable = () => {
    const letters = 'ABCDEFGH';
    const table = document
        .getElementById('table');
    table.innerHTML = '';

    // Добавляются ячейки первой строки (заголовки столбцов)
    const row = table.insertRow();
    const cell = row.insertCell();
    cell.classList.add('no');
    for (let j = 0; j < letters.length; j++) {
        const cell = row.insertCell();
        cell.innerText = letters[j];
        cell.classList.add('h');
    }

    const cell2 = row.insertCell();
    cell2.classList.add('no');

    for (let i = 1; i <= 8; i++) {
        const row = table.insertRow();
        const cell = row.insertCell();
        cell.innerText = 8 - i+1;
        cell.classList.add('h');
        for (let j = 1; j <= 8; j++) {
            const cell = row.insertCell();
            cell.classList.add('cell');
            const [x, y] = num2char(i, j);
            cell.id = x + y;
            cell.addEventListener("click", cellListener(i, j));
        }

        const cell2 = row.insertCell();
        cell2.innerText = 8 - i+1;
        cell2.classList.add('h');

    }

    // Добавляются ячейки первой строки (заголовки столбцов)
    const row2 = table.insertRow();
    const cell3 = row2.insertCell();
    cell3.classList.add('no');
    for (let j = 0; j < letters.length; j++) {
        const cell = row2.insertCell();
        cell.innerText = letters[j];
        cell.classList.add('h');
    }

    const cell4 = row2.insertCell();
    cell4.classList.add('no');
    clearColors();
}

window.onload = () => {
    createTable()
}
