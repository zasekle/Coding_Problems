/**
 * 6 Degrees of Kevin Bacon!
 **/

const actorName = readline();
const n = parseInt(readline());

// Map<string, [string]>
const castMap = new Map();
const kevinBacon = "Kevin Bacon";
for (let i = 0; i < n; i++) {
    const castLine = readline().split(": ")[1].split(", ");

    for (let j = 0; j < castLine.length; j++) {
        if (castLine[j] === kevinBacon) {
            continue;
        }
        for (let k = 0; k < castLine.length; k++) {
            if (j !== k) {
                if (castMap.has(castLine[j])) {
                    castMap.get(castLine[j]).push(castLine[k])
                } else {
                    castMap.set(castLine[j], [castLine[k]]);
                }
            }
        }
    }
}

//Set<string>
const usedActors = new Set([actorName]);
const currentActors = castMap.get(actorName);
let head = 0;
let baconNumber = 0;
let baconFound = actorName === kevinBacon;

while (!baconFound) {
    baconNumber++;

    let levelSize = currentActors.length - head;
    for (let i = 0; i < levelSize; i++) {
        if (currentActors[i] === kevinBacon) {
            baconFound = true;
            break;
        } else {
            const associatedActors = castMap.get(currentActors[i]);
            for (const associate of associatedActors) {
                if (!usedActors.has(associate)) {
                    currentActors.push(associate);
                    usedActors.add(associate);
                }
            }
        }
    }
}

console.log(baconNumber);
