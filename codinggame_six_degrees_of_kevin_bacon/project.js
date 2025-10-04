/**
 * 6 Degrees of Kevin Bacon!
 **/

const actorName = readline();
const n = parseInt(readline());
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

let currentActors = new Set(castMap.get(actorName));
let nextActors = new Set();
const usedActors = new Set([actorName]);
let baconFound = actorName === kevinBacon;
let baconNumber = 0;

while (!baconFound) {
    baconNumber++;

    for (const actor of currentActors) {
        if (actor === kevinBacon) {
            baconFound = true;
            break;
        } else {
            const associatedActors = castMap.get(actor);
            for (const associatedActor of associatedActors) {
                if (!usedActors.has(associatedActor)) {
                    nextActors.add(associatedActor);
                    usedActors.add(associatedActor);
                }
            }
        }
    }
    currentActors = nextActors;
    nextActors = new Set();
}

console.log(baconNumber);
