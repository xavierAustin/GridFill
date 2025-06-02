const STARTING_GRIDSIZE = 4;
const EVOLUTION_SOLVE_NUM = 2;
const ABSOLUTE_MAX_SIZE = 11;

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
        this.scorePerPuzzle = 100;
        this.grid = [];
        this.pieceTable = [];
        for (let x = 0; x < STARTING_GRIDSIZE; x++){
            let temp = [];
            for (let y = 0; y < STARTING_GRIDSIZE; y++)
                temp.push(0);
            this.grid.push(temp);
        }
        this.MAXITER = this.grid.length * this.grid.length;
    }
    getGrid(){
        return this.grid;
    }
    clearGrid(){
        for (let x = 0; x < this.grid.length; x++)
            for (let y = 0; y < this.grid.length; y++)
                this.grid[x][y] = 0;
    }
    setMode(mode){
        this.mode = mode;
    }
    gridSizeUp(){
        if (this.grid.length >= ABSOLUTE_MAX_SIZE)
            return;
        this.grid = [];
        for (let x = 0; x <= this.grid.length; x++){
            let temp = [];
            for (let y = 0; y <= this.grid.length; y++)
                temp.push(0);
            this.grid.push(temp);
        }
        this.MAXITER = this.grid.length * this.grid.length;
        //increases scoring too
        this.scorePerPuzzle *= 2 * this.scorePerPuzzle / 100;
    }
    placePiece(pieceIndex,x,y){
        //check if piece can be placed at given x and y
        possible = true;
        for (let j = 0; j < pieces[pieceIndex].length; j++)
            possible &= (this.grid[pieces[pieceIndex][j].x + x] && this.grid[pieces[pieceIndex][j].x + x][pieces[pieceIndex][j].y + y])
        if (!possible)
            return false;
        //place it if possible
        for (let j = 0; j < pieces[pieceIndex].length; j++)
            this.grid[pieces[pieceIndex][j].x + x][pieces[pieceIndex][j].y + y] = pieceIndex;
        return true;
    }
    generatePuzzle(){
        this.clearGrid();
        let numOfPieces = Math.floor((Math.random() * 0.6 + 1.3) * this.grid.length);
        let imaginaryGrid = shuffle(this.getEmptyCells());
        let pieces = [];
        let skipped = 0;
        for (let i = 0; i < numOfPieces; i ++){
            pieces.push([imaginaryGrid.pop()]);
        }
        //add one cell to each randomly grabbed cell every iteration
        for (let totalIter = 0; (totalIter < this.MAXITER + skipped) && (imaginaryGrid.length > 0); totalIter++){
            shuffle(pieces)
            for (let i = 0; i < pieces.length; i++){
                for (let j = 0; j < imaginaryGrid.length; j++){
                    //adds some varation to the piece size for more interesting puzzles
                    if (skipped < 10 && Math.random() < 0.5){
                        skipped ++;
                        continue;
                    }
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
                this.grid[pieces[i][j].x][pieces[i][j].y] = i;
        console.log(this.grid);
        //make trick piece
        let temp = pieces.at(-1).slice();
        temp.pop(); //theoretically makes a valid shape always but could do with some testing
        pieces.push(temp);
        shuffle(pieces);
        //see method below
        for (let i = 0; i < pieces.length; i++){
            this.normalizePiece(pieces[i])
        }
        return pieces;
    }
    normalizePiece(piece){
        //translate pieces such that they are mostly dissociated from the solution
        let min = {x: Infinity, y: Infinity};
        for (let i = 0; i < piece.length; i++){
            if (piece[i].x < min.x)
                min.x = piece[i].x;
            if (piece[i].y < min.y)
                min.y = piece[i].y;
        }
        for (let i = 0; i < piece.length; i++){
            piece[i].x -= min.x;
            piece[i].y -= min.y;
        }
    }
    getEmptyCells(){
        let out = [];
        for (let x = 0; x < this.grid.length; x++)
            for (let y = 0; y < this.grid.length; y++)
                if (this.grid[x][y] == 0)
                    out.push({x:x,y:y})
        return out;
    }
}
