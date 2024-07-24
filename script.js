const gridContainer = document.getElementById("container");
let sizeOfContainer = 16;
let isMouseDown = false;
let rubberActive = false;
let colorSelected = "rainbow";

function clearGrid(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function createGrid(size) {
    clearGrid(gridContainer);
    const cellSize = 700 / size;  
    for(let y = 0; y < size; y++){
        for(let x = 0; x < size; x++){    
            const cell = document.createElement("div");
            cell.classList.add('cell');
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            gridContainer.appendChild(cell);
        }
    }
    document.querySelector(".sizeinput").value = size;
    attachEventListeners();
}

function attachEventListeners() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.addEventListener("mousedown", () => {
            if (rubberActive) {
                cell.style.backgroundColor = ""; 
                cell.style.opacity = 1;
                cell.classList.remove("clicked");
                cell.classList.remove("active");
            } else {
                if (!cell.classList.contains("clicked")) {
                    cell.classList.add("clicked");
                    cell.classList.remove("active");
                    cell.style.backgroundColor = getCurrentColor();
                    cell.style.opacity = getCurrentOpacity();
                } else {
                    let currentOpacity = parseFloat(cell.style.opacity);
                    if (currentOpacity < 1) {
                        cell.style.opacity = currentOpacity + 0.1;
                    }
                }
            }
        });
        
        cell.addEventListener("mouseover", () => {
            if (isMouseDown) {
                if (rubberActive) {
                    cell.style.backgroundColor = ""; 
                    cell.style.opacity = 1;
                    cell.classList.remove("clicked");
                    cell.classList.remove("active");
                } else {
                    if (!cell.classList.contains("clicked")) {
                        cell.classList.add("clicked");
                        cell.classList.remove("active");
                        cell.style.backgroundColor = getCurrentColor();
                        cell.style.opacity = getCurrentOpacity();
                    } else {
                        let currentOpacity = parseFloat(cell.style.opacity);
                        if (currentOpacity < 1) {
                            cell.style.opacity = currentOpacity + 0.1;
                        }
                    }
                }
            }
        });

        cell.addEventListener("mouseover", () => {
            if (!(cell.classList.contains("clicked")|| cell.classList.contains("active"))) {
                cell.style.backgroundColor = "#ccc"; 
            }
        });

        cell.addEventListener("mouseout", () => {
            if (!(cell.classList.contains("clicked")|| cell.classList.contains("active"))) {
                cell.style.backgroundColor = ""; 
            }
        });
    });
}

document.addEventListener("mousedown", () => {
    isMouseDown = true;
});

document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

function getRandomRgbaColor() {
    const r = Math.floor(Math.random() * 175);
    const g = Math.floor(Math.random() * 175);
    const b = Math.floor(Math.random() * 175);
    return `rgb(${r}, ${g}, ${b})`;
}

function getBlackRgbaColor() {
    return `rgb(0, 0, 0)`;
}

function resetCells() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.backgroundColor = ""; 
        cell.style.opacity = 1;
        cell.classList.remove("clicked");
        cell.classList.remove("active");
    });
}

function resetCellsForswapColor() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.classList.remove("clicked");
        if(cell.style.backgroundColor != ""){
            cell.classList.add("active");
        }
        
    });
}

const resetBtn = document.querySelector(".resetBtn");
resetBtn.addEventListener("click", resetCells);

function swapTool() {
    rubberActive = !rubberActive;
    ToggleTool.innerText = rubberActive ? "Set to pen" : "Set to rubber";
}
const ToggleTool = document.querySelector(".ToggleTool");
ToggleTool.addEventListener("click", swapTool);

function swapColor() {
    switch (colorSelected) {
        case "rainbow":
            colorSelected = "pencil";
            colorModeSwitcher.innerText = "Colour: pencil";
            break;
        case "pencil":
            colorSelected = "black";
            colorModeSwitcher.innerText = "Colour: black";
            break;
        case "black":
            colorSelected = "rainbow";
            colorModeSwitcher.innerText = "Colour: rainbow";
            break;
        default:
            colorSelected = "rainbow";
            colorModeSwitcher.innerText = "Colour: rainbow";
    }
    resetCellsForswapColor();
}

function getCurrentColor() {
    switch (colorSelected) {
        case "rainbow":
            return getRandomRgbaColor();
        case "pencil":
            return getBlackRgbaColor();
        case "black":
            return getBlackRgbaColor();
        default:
            return getRandomRgbaColor();
    }
}
function getCurrentOpacity() {
    switch (colorSelected) {
        case "black":
            return 1;
        default:
            return 0.7;
    }
}

const colorModeSwitcher = document.querySelector(".colorModeSwitcher");
colorModeSwitcher.addEventListener("click", swapColor);

function changeSizeContainer() {
    const sizeInput = document.querySelector(".sizeinput").value;
    const newSize = parseInt(sizeInput, 10);
    if (newSize > 0 && newSize <= 100) {
        createGrid(newSize);
    } else {
        alert("Please enter a size between 1 and 100.");
    }
}

const submitButton = document.querySelector(".submitSize");
submitButton.addEventListener("click", changeSizeContainer);

createGrid(sizeOfContainer);
