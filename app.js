let fieldSizeInp = document.querySelector('.fieldSizeInp');
let minesAmountInp = document.querySelector('.minesAmountInp');
const field = document.querySelector('.field')
const fieldSizeDiv = document.querySelector('.fieldSize');
const optionMenu = document.querySelector('.options');

function startGameBtn(){
    if(fieldSizeInp.value === '' && minesAmountInp.value === ''){
        fieldSizeDiv.style.width = '320px';
        game(8,8,10);
    }
    else{
        fieldSizeDiv.style.width = fieldSizeInp.value*40+'px';
        game(fieldSizeInp.value,fieldSizeInp.value,minesAmountInp.value);
    }
}

function game(width, height, mAmount){
    const elementsAmount = width*height;
    field.innerHTML = '<button></button>'.repeat(elementsAmount);
    const mIndex = [...Array(elementsAmount).keys()].sort(()=>Math.random() -0.5).slice(0, mAmount);
    const cells = [...field.children];
    let closedCount = elementsAmount;

    field.addEventListener('click', (event)=>{
        if(event.target.tagName !== 'BUTTON'){
            console.log(mIndex);
            return;
        }
        const index = cells.indexOf(event.target);
        const column = index % width;
        const row = Math.floor(index/width);
        open(row, column);
    });

    function open(row, column){
        if(!isValid(row,column)) return;
        const index = row * width + column;
        const cell = cells[index];
        if(cell.disabled === true) return;
        cell.disabled = true;
        if(isMine(row, column)){
            cell.innerText = '💣';
            alert("ГЕЙМ ОВЕР");
            return;
        }
        closedCount--;
        if(closedCount <= mAmount){
            alert("ПОБЕДА, ПОБЕДА ВМЕСТО ОБЕДА!!!");
            return;
        }
        const minesCounter = getMinesAmount(row, column);
        if(minesCounter !== 0){
            cell.innerText = minesCounter;
            return;
        }
        for(let i=-1; i<=1; i++){
            for(let j=-1; j<=1; j++){
                open(row+j, column+i);
            }
        }
    }

    function isValid(row, column){
        return row>=0 && row<height
            && column>=0 && column<width;
    }

    function isMine(row, column){
        if(!isValid(row, column)) return false;
        const index = row * width + column;
        return mIndex.includes(index);
    }

    function getMinesAmount(row, column){
        let minesCounter = 0;
        for(let i=-1; i<=1; i++){
            for(let j=-1; j<=1; j++){
                if(isMine(row+i, column+j)){
                    minesCounter++;
                }
            }
        }
        return minesCounter;
    }
}

function settingsBtnFunc(){
    if(optionMenu.hidden){
        optionMenu.hidden = false;
    }
    else{
        optionMenu.hidden = true;
    }
}

function saveOption(){
    if(fieldSizeInp.value!=='' && minesAmountInp.value!==''){
        fieldSizeDiv.style.width = fieldSizeInp.value*40+'px';
        game(fieldSizeInp.value,fieldSizeInp.value,minesAmountInp.value);
    }
}

