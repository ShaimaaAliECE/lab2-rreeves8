import React, { Component } from 'react'
import './App.css';
import logo from './logo192.png'
function Cell(props){
    return <div className = 'cell'>
               <div className = {props.color}> 
 
               </div>
           </div>
}

function Column(props){ 
    let newCells = [];
    for(let j = 0; j < 6; j++){
        newCells[j] =<Cell
                        key = {j}
                        y = {j}
                        x = {props.x}
                        color = {props.cells[j]}
                      ></Cell>
        
    }
    
    return <div className="collumn" onClick = {() => props.handleClick()}> 
               {newCells}
           </div>
}


class Grid extends Component {
    constructor(){
        super();
        var newCells =  Array.from(Array(7), () => {
            return new Array(6).fill('none')
        })
        
        this.state = {
            cells: newCells,
            playerTurn: 'red',
            winner: ''
        }
    }

    checkUpDown(data){
        let nextColor = ''     
        let count = 0;
        let operator = '+'
        
        for(let k = 0; k < 2; k++){
            for(let i = 1; i < 4; i++){
                nextColor = data.cells[data.x][this.operator(operator,data.y,i)]
                
                if(nextColor === data.curr){
                    count++; 
                }
            }

            if(count === 3){
                return data.curr;
            }

            if(data.curr !== data.cells[data.x][data.y-1]){
                break;
            }
            
            operator = '-'
        }

        return ''
    }

    checkLeftRight(data){
        let nextColor = ''     
        let count = 0;
        let operator = '+'

        for(let k = 0; k < 2; k++){
            for(let i = 1; i < 4; i++){
                if(!(data.x + i > 6) && !(data.x-i<0)){
                    nextColor = data.cells[this.operator(operator,data.x,i)][data.y]  
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
                return data.curr;
            }
            operator = '-'

        }
        return ''
    }

    checkDiagonalNegative(data){
        let nextColor = ''     
        let count = 0;
        let operator1 = '+'
        let operator2 = '-'

        for(let k = 0; k < 2; k++){
            for(let i = 1; i < 4; i++){
                if(!(data.x + i > 6) && !(data.y + i > 6) && !(data.x - i < 0) && !(data.y -i < 0)){
                    nextColor = data.cells[this.operator(operator1,data.x,i)][this.operator(operator2,data.y,i)]
                    console.log(nextColor + ', ' + data.curr)
                    if(nextColor === data.curr){
                        count++;
                        console.log(count)
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
        let winner = {
            UpDown: '',
            LeftRight: '',
            diagonalNeg: '',
            diagonalPos:''
        }

        for(let x = 0; x < 7; x++){
            for(let y = 0; y < 6; y ++){
                let curr = cells[x][y]

                if(curr !== 'none'){
                    let data = {
                        curr: cells[x][y],
                        cells: cells,
                        x: x,
                        y: y,
                    }
                    winner.UpDown = this.checkUpDown(data)

                    winner.LeftRight = this.checkLeftRight(data)
                    
                    winner.diagonalPos = this.checkDiagonalPositive(data)

                    winner.diagonalPos = this.checkDiagonalNegative(data)

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
                        return winner.diagonalPos
                    }
                }
            }
        }
        return ''
    }

    operator(op, val1, val2){
        if(op === '+'){
            return val1 + val2;
        }
        if(op === '-'){
            return val1-val2;
        }
    }

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
        if(this.state.winner === ''){       
            for(let y = 6; y > -1; y--){
                if(this.state.cells[columnNum][y] === 'none'){
 
                    let prevState = this.state;
                    let newCells = this.state.cells;
                    newCells[columnNum][y] = prevState.playerTurn;

                    this.setState({
                        cells: newCells,    
                        playerTurn: (prevState.playerTurn === 'red') ? 'black' : 'red',
                        winner: this.checkWinner(newCells)
                    })
                    break;
                }
            }
        }
    }
    
    render(){    
        let columns = []
        for(let i = 0; i < 7; i++){
            columns[i] =
                <Column
                    key = {i}
                    x = {i}
                    cells = {this.state.cells[i]}
                    handleClick = {() => this.handleClick(i)}
                ></Column>
        }
        
             
        return(
            <div>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Connect4!</h2>
                </div>
                <div className = 'grid'>
                    {columns}
                </div>
                <div className = 'winner-text'> {this.state.winner} </div>
            </div>
        );
  }
}


export default Grid;
