
function Piece(block,color){
    this.block = block;
    this.color = color;

    this.blockN = 0; // we start from the first pattern
    this.activeBlock = this.block[this.blockN];

    // we need to control the
    this.x = 3;
    this.y = -2;
}

let Block = Piece.prototype;

// fill function

Block.fill = function(color){
    for( r = 0; r < this.activeBlock.length; r++){
        for(c = 0; c < this.activeBlock.length; c++){
            // we draw only occupied squares
            if( this.activeBlock[r][c]){
                drawSquare(this.x + c,this.y + r, color);
            }
        }
    }
}

// draw a piece to the board

Block.draw = function(){
    this.fill(this.color);
}

// undraw a piece

Block.unDraw = function(){
    this.fill(VACANT);
}

let score = 0;

Block.lock = function(){
    for( r = 0; r < this.activeBlock.length; r++){
        for(c = 0; c < this.activeBlock.length; c++){
            // we skip the vacant squares
            if( !this.activeBlock[r][c]){
                continue;
            }
            //  to lock on top = game over
            if(this.y + r < 0){
                GameOver();
                // stop request animation frame
                gameOver = true;
                break;
            }
            // we lock the piece
            board[this.y+r][this.x+c] = this.color;
        }
    }
    // remove full rows
//     for(r = 0; r < ROW; r++){
//         let isRowFull = true;
//         for( c = 0; c < COL; c++){
//             // isRowFull = isRowFull && (board[r][c] != VACANT);
//         }
//         if(isRowFull){
//             // if the row is full
//             // we move down all the rows above it
//             for( y = r; y > 1; y--){
//                 for( c = 0; c < COL; c++){
//                     board[y][c] = board[y-1][c];
//                 }
//             }
//             // the top row board[0][..] has no row above it
//             for( c = 0; c < COL; c++){
//                 board[0][c] = VACANT;
//             }
//             // increment the score
//             score += 10;
//         }
//     }
    this.removeFullRow();
    // update the board
    drawBoard();

    // update the score
    //scoreElement.innerHTML = score;
}

// border function

Block.border = function(x,y,piece){
    for( r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){
            // if the square is empty, we skip it
            if(!piece[r][c]){
                continue;
            }
            // coordinates of the piece after movement
            let newX = this.x + c + x;
            let newY = this.y + r + y;

            // conditions
            if(newX < 0 || newX >= COL || newY >= ROW){
                return true;
            }
            // skip newY < 0; board[-1] will crush our game
            if(newY < 0){
                continue;
            }
            // check if there is a locked piece already in place
            if( board[newY][newX] != VACANT){
                return true;
            }
        }
    }
    return false;
}
