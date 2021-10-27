import React, { Component } from 'react'
import './App.css';

function Cell(props){
    return <div className = 'cell'>
               <div className = {props.color}> 
                   {props.x}, {props.y}
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

        console.log("exam for " + data.x + "," + data.y)


        for(let k = 0; k < 2; k++){
            for(let i = 1; i < 4; i++){
                if(!(data.x + i >= 5)){
                    nextColor = data.cells[this.operator(operator,data.x,i)][data.y]
                    if(nextColor === data.curr){
                        count++; 
                        console.log(count)
                    }
                }
                else{
                    operator = '-'
                    break;
                }
            }

            if(count === 3){
                return data.curr;
            }

        }
        return ''
    }

    checkWinner(cells){
        let winner = ''; 

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
                    winner = this.checkUpDown(data)

                    winner = this.checkLeftRight(data)
                    
                    if(winner !== ''){
                        return winner
                    }
                   
                }
            }
        }
        return '';
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
                <div className = 'grid'>
                    {columns}
                </div>
                <div>
                    {this.state.winner}
                </div>
            </div>
        );
  }
}


export default Grid;
