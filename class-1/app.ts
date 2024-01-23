type Coordinate = {
    x: number,
    y: number,
}

function sum(
    a: Coordinate,
    b: Coordinate,
): Coordinate {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    }
}

export default sum;
