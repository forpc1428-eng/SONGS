let queue = [];

export function addToQueue(song){
    queue.push(song);
}

export function getNext(){
    return queue.shift();
}
