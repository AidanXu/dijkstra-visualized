// Uses Dijkstra's algorithm to return shortest path between start and end node

export function dijkstra(nodes, start, finish) {
    const visited = []; //array of visited nodes in order
    start.distance = 0;
    const unvisited = getAllNodes(nodes);
    while (!!unvisited.length) {
        sortNodesByDistance(unvisited);
        const closest = unvisited.shift();

        // ignore walls
        if (closest.isWall) continue;

        // if the closest node is infinity then the path is a dead end and we must backtrack
        if (closest.distance === Infinity) return visited;

        //updates the visited nodes array
        closest.isVisited = true;
        visited.push(closest);

        if (closest === finish) return visited;

        updateUnvisitedNeighbours(closest, nodes);
    }

}

function sortNodesByDistance(unvisited) {
    // sorts nodes in ascending order by distance
    unvisited.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbours(node, nodes) {
    const unvisited = getUnvisitedNeighbours(node, nodes);
    for (const adjacent of unvisited) {
        adjacent.distance = node.distance + 1;
        adjacent.previousNode = node;
    }
}

function getUnvisitedNeighbours(node, nodes) {

    //adds all nearby unvisited nodes into an array and returns it
    const adjacent = [];
    const {col, row} = node;

    // checks if nodes available on 4 directions and adds if available
    if (row > 0) adjacent.push(nodes[row -1][col]);
    if (row < nodes.length - 1) adjacent.push(nodes[row + 1][col]);
    if (col > 0) adjacent.push(nodes[row][col -1]);
    if (col < nodes[0].length - 1) adjacent.push(nodes[row][col + 1]);

    // returns all the unvisited nodes
    return adjacent.filter(n => !n.isVisited);

}

function getAllNodes(nodes) {
    const n1 = []; //return value
    for (const row of nodes) {
        for (const node of row) {
            //iterates through grid and pushes all nodes into an array
            n1.push(node);
        }
    }
    return nodes;
}

export function getNodesInShortestPathOrder(finish) {

    //returns nodes in shortest path backtracking from the end
    const nodesInShortestPath = [];
    let current = finish;
    while (current !== null) {
        nodesInShortestPath.unshift(current);
        current = current.previousNode;
    }
    return nodesInShortestPath;
}