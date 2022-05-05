import React, {Component} from 'react';
import Node from './Node/Node';

import './PathfindingVisualizer.css'

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        const nodes = createGrid();
        this.setState({nodes});
    }

    // creates a wall node where the mouse is pressed
    mouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(this.state.nodes, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }


    mouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.nodes, row, col);
        this.setState({nodes: newGrid});
    }

    render() {
        
        const {nodes, mouseIsPressed} = this.state;
        //console.log(this.state);

        return (
            <div className="grid">
                {nodes.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const {row, col, isFinish, isStart, isWall} = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        col={col}
                                        isFinish={isFinish}
                                        isStart={isStart}
                                        isWall={isWall}
                                        mouseIsPressed={mouseIsPressed}
                                        row={row}></Node>
                                );
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }
    
}

const createGrid = () => {
    const nodes = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(newNode(col, row));
        }
        nodes.push(currentRow);
    }
    return nodes;
};

const newNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === 10 && col === 15,
        isFinish: row === 10 && col === 35,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };

}

const getNewGridWithWallToggled = (nodes, row, col) => {
    const newGrid = nodes.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
}