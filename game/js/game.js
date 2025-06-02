const STARTING_GRIDSIZE = 4;
const EVOLUTION_SOLVE_NUM = 2;

function shuffle(array) {
    for (let i = array.length; i > 0; i--) {
        let rand = Math.floor(Math.random() * i);
        let temp = array.pop();
        array.splice(rand,0,temp);
    }
    return array;
}

class Game{
    constructor(){
        this.mode = null;
        this.puzzlesSolved = 0;
        this.grid = [];
        for (let x = 0; x < STARTING_GRIDSIZE; x++){
            let temp = [];
            for (let y = 0; y < STARTING_GRIDSIZE; y++)
                temp.push(0);
            this.grid.push(temp);
        }
        this.MAXITER = this.grid.length * this.grid.length;
    }
    setMode(mode){
        this.mode = mode;
    }
    gridSizeUp(){
        this.grid = [];
        for (let x = 0; x <= this.grid.length; x++){
            let temp = [];
            for (let y = 0; y <= this.grid.length; y++)
                temp.push(0);
            this.grid.push(temp);
        }
        this.MAXITER = this.grid.length * this.grid.length;
    }
    generatePuzzle(){
        let numOfPieces = Math.floor((Math.random() * 0.6 + 1.2) * this.grid.length);
        let imaginaryGrid = shuffle(this.getEmptyCells());
        let pieces = [];
        for (let i = 0; i < numOfPieces; i ++){
            pieces.push([imaginaryGrid.pop()]);
        }
        //add one cell to each randomly grabbed cell every iteration
        for (let totalIter = 0; totalIter < this.MAXITER && imaginaryGrid.length > 0; totalIter++){
            for (let i = 0; i < pieces.length; i++){
                for (let j = 0; j < imaginaryGrid.length; j++){
                    //check conectivity
                    let canConnect = false;
                    for (let cellInd = 0; cellInd < pieces[i].length; cellInd++){
                        let xNotCheck = pieces[i][cellInd].x != imaginaryGrid[j].x;
                        if (xNotCheck && pieces[i][cellInd].y != imaginaryGrid[j].y)
                            continue;
                        if (xNotCheck && (pieces[i][cellInd].x+1 == imaginaryGrid[j].x || pieces[i][cellInd].x-1 == imaginaryGrid[j].x) ||
                            (!xNotCheck) && (pieces[i][cellInd].y+1 == imaginaryGrid[j].y || pieces[i][cellInd].y-1 == imaginaryGrid[j].y)){
                            canConnect = true;
                            break;
                        }
                    }
                    //if piece connects add to currently generating piece
                    if (canConnect){
                        pieces[i].push(imaginaryGrid[j]);
                        imaginaryGrid.splice(j, 1);
                        //add only one cell to every piece every iteration to make the piece sizes closer to even
                        break;
                    }
                }
            }
        }
        //if you iterate through every cell and cant find a piece to add said cell to (shouldn't really happen) add that cell as a piece
        for (let i = 0; i < imaginaryGrid.length; i ++){
            pieces.push([imaginaryGrid.pop()]);
        }
        //debug
        for (let i = 0; i < pieces.length; i++)
            for (let j = 0; j < pieces[i].length; j++)
                this.grid[pieces[i][j].x][pieces[i][j].y] = (i+10).toString(36);
        console.log(this.grid);
        return pieces;
    }
    getEmptyCells(){
        let out = [];
        for (let x = 0; x < this.grid.length; x++)
            for (let y = 0; y < this.grid.length; y++)
                if (this.grid[x][y] == 0)
                    out.push({x:x,y:y,0:x,1:y})
        return out;
    }
}
