import React, { Component } from 'react'
import './App.css';
import logo from './logo192.png'

function Cell(props){//react function for creating a circle element or cell, the color of the cell is passed through props
    return <div className = 'cell'>
               <div className = {props.color}>  
               </div>
           </div>
}

function Column(props){  //react function for creating a collum, each collum holds an array of cells. 
    let newCells = []; //creating the holder of cells
    for(let j = 0; j < 6; j++){ //filling the collum with cells or cirlcles, the props.cells contains the color of the corresponding cell in memory
        newCells[j] =<Cell
                        key = {j}
                        y = {j}
                        x = {props.x}
                        color = {props.cells[j]} //assign the color of the cell from the collumns list of colors
                      ></Cell>
        
    }
    
    return <div className="collumn" onClick = {() => props.handleClick()}> 
               {newCells}
           </div> // return the created collumn with the proper cell elements added, attatch the click handler to the collumn not the cells
}

class Grid extends Component {
    constructor(){
        super();
        var newCells =  Array.from(Array(7), () => {
            return new Array(6).fill('none')
        })//create and empty double array with each color being none, or just blank
        
        this.state = { 
            cells: newCells,
            playerTurn: 'red',
            winner: ''
        } //set the initial state to the first player being red, no winner, and assign the empty cells array to the state
    }

    checkUpDown(data){ 
        let nextColor = '' //the next cells color    
        let count = 0; //the count of correct cells
        let operator = '+'
        //data.curr is the current one being looked at, k loop is for flipping directions, i loop is for counting up to 4
        for(let k = 0; k < 2; k++){
            for(let i = 1; i < 4; i++){
                nextColor = data.cells[data.x][this.operator(operator,data.y,i)] //operator function for switching between adding and subtracting the next x or y pos
                if(nextColor === data.curr){
                    count++; 
                }
            }

            if(count === 3){ //if count = 3 return the current color 
                return data.curr;
            }
            //if the next cell bellow is not the same color dont bother checking down
            if(data.curr !== data.cells[data.x][data.y-1]){
                break;
            }
            
            //flip to subtraction to check below
            operator = '-'
        }
        //got nothing return none
        return ''
    }

    checkLeftRight(data){
        let nextColor = ''     
        let count = 0;
        let operator = '+'

        for(let k = 0; k < 2; k++){
            for(let i = 1; i < 4; i++){
                if(!(data.x + i > 6) && !(data.x-i<0)){ //ensure that it doesnt go out of bounds
                    nextColor = data.cells[this.operator(operator,data.x,i)][data.y]  
                    if(nextColor === data.curr){ // if the next color is the same add to count
                        count++; 
                    }
                    else{ //if color is not the same flip which side we're counting from and break the current check
                        operator = '-'
                        break;
                    }
                }               
                
            }//if count is bigger than 3 return the winner
            if(count >= 3){
                return data.curr;
            }
            operator = '-'

        }
        return ''
    }

    checkDiagonalNegative(data){
        let nextColor = ''     
        let count = 0;
        let operator1 = '+' //two operators cause y axis is postitive and x is negative
        let operator2 = '-'

        for(let k = 0; k < 2; k++){
            for(let i = 1; i < 4; i++){
                if(!(data.x + i > 6) && !(data.y + i > 6) && !(data.x - i < 0) && !(data.y -i < 0)){//bounds check
                    nextColor = data.cells[this.operator(operator1,data.x,i)][this.operator(operator2,data.y,i)]
                    
                    if(nextColor === data.curr){
                        count++;
                    }
                    
                    else{
                        operator1 = '-'
                        operator2 = '+'
                        break;
                    }
                }
                
            }
            if(count >= 3){
                return data.curr
            }
            operator1 = '-'
            operator2 = '+'
        }
        return ''
    }

    checkDiagonalPositive(data){
        let nextColor = ''     
        let count = 0;
        let operator = '+'

        for(let k = 0; k < 2; k++){
            for(let i = 1; i < 4; i++){
                if(!(data.x + i > 6) && !(data.y + i > 6) && !(data.x - i < 0) && !(data.y -i < 0)){
                    nextColor = data.cells[this.operator(operator,data.x,i)][this.operator(operator,data.y,i)]
   
                    if(nextColor === data.curr){
                        count++;
                    }
                    
                    else{
                        operator = '-'
                        break;
                    }
                }
                
            }
            if(count >= 3){
                return data.curr
            }
            operator = '-'
        }
        return ''
    }

    checkWinner(cells){
        let winner = { //holder for the winner values, winn constittutes there being an updown line of 4, left to right of 4, and diagonal to the left, and diagonal to the right
            UpDown: '',
            LeftRight: '',
            diagonalNeg: '',
            diagonalPos:''
        }
        //cycle through all cells
        for(let x = 0; x < 7; x++){
            for(let y = 0; y < 6; y ++){
                let curr = cells[x][y] //store the current one being checked

                if(curr !== 'none'){ //if the current cell is a color lets check for a line of 4
                    let data = { //holder that saves the values of the cell
                        curr: cells[x][y],
                        cells: cells,
                        x: x,
                        y: y,
                    }
                    //check for winner in each direction and assign the winner values
                    winner.UpDown = this.checkUpDown(data) //check going up and down

                    winner.LeftRight = this.checkLeftRight(data) //check going left or right
                    
                    winner.diagonalPos = this.checkDiagonalPositive(data) //check going diagonal to the left

                    winner.diagonalNeg = this.checkDiagonalNegative(data) //check going diagonal to the right

                    //if theres a winner lets return its color, 
                    if(winner.UpDown !== ''){
                        console.log("updown win")
                        return winner.UpDown
                    }
                    if(winner.LeftRight !== ''){
                        console.log("left right win")
                        return winner.LeftRight
                    }

                    if(winner.diagonalPos !== ''){
                        console.log("diagonal win")
                        return winner.diagonalPos
                    }

                    if(winner.diagonalNeg !== ''){
                        console.log('diagonal win neg')
                        return winner.diagonalNeg
                    }
                }
            }
        }
        //if no winner return empty
        return ''
    }
    //function for adding or subtracting two values based on a string input
    operator(op, val1, val2){
        if(op === '+'){
            return val1 + val2;
        }
        if(op === '-'){
            return val1-val2;
        }
    }

    //testing function for prining the values of the cells to the console
    printArray(array){
        for(let x = 0; x < 7; x++){
            let s = ''
            for(let y = 0; y < 6; y++){
                s += ', ' + array[x][y]
            }
            console.log(s)
        }
    }

    handleClick(columnNum) {        
        if(this.state.winner === ''){  //if no winner lets check add another circle and check if theres a winner
            for(let y = 6; y > -1; y--){ //cycle through the state double array, where the clicked collumn indicated which array to select
                if(this.state.cells[columnNum][y] === 'none'){ //cycle upward through the collumn until and empty spot is found
 
                    let prevState = this.state; //capture the current state and assign new values
                    let newCells = this.state.cells;
                    newCells[columnNum][y] = prevState.playerTurn; 

                    this.setState({
                        cells: newCells,    
                        playerTurn: (prevState.playerTurn === 'red') ? 'black' : 'red',
                        winner: this.checkWinner(newCells)
                    })
                    //set the new state and add the new color, when assigning the new winner state call the function check winner to see if theres a winer based on the new set of cells
                    break;
                }
            }
        }
    }
    
    render(){    
        let columns = [] //create an empty array to hold the collumn elements. assign the coloring of each cell or circle by passing the current state array in
        for(let i = 0; i < 7; i++){
            columns[i] =
                <Column
                    key = {i}
                    x = {i}
                    cells = {this.state.cells[i]}
                    handleClick = {() => this.handleClick(i)}
                ></Column>//send in click handler to the collumn and each array of cell colors to the corresponding collumn
        }
                
        return(
            <div>
                <div className="App-header">
                    <a className = 'link' href="https://github.com/ShaimaaAliECE/lab2-rreeves8">GITHUB</a>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Connect4!</h2>
                </div>
                <div className = 'grid'>
                    {columns}
                </div>
                <div className = 'winner-text'> {this.state.winner} </div>
            </div>
        ); //create the header and the grid, the div element grid hols the collumns 
  }
}


export default Grid;
