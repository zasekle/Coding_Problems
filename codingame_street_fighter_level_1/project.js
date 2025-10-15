const NAME = "N";
const LIFE = "L";
const PUNCH = "P";
const KICK = "K";
const RAGE = "R";
const HITS = "H";

const char_sheet = {
    "KEN": {
        LIFE: 25,
        PUNCH: 6,
        KICK: 5,
        RAGE: 0,
        HITS: 0,
        SPECIAL(defender) { 
            const rage = this.RAGE;
            this.RAGE = 0;
            return 3*rage;
        },
    },
    "RYU": {
        LIFE: 25,
        PUNCH: 4,
        KICK: 5,
        RAGE: 0,
        HITS: 0,
        SPECIAL(defender) {
            const rage = this.RAGE;
            this.RAGE = 0;
            return 4*rage;
        }
    },
    "TANK": {
        LIFE: 50,
        PUNCH: 2,
        KICK: 2,
        RAGE: 0,
        HITS: 0,
        SPECIAL(defender) {
            const rage = this.RAGE;
            this.RAGE = 0;
            return 2*rage;
        } 
    },
    "VLAD": {
        LIFE: 30,
        PUNCH: 3,
        KICK: 3,
        RAGE: 0,
        HITS: 0,
        SPECIAL(defender) {
            const rage = this.RAGE;
            const oppRage = defender.RAGE;
            this.RAGE = 0;
            defender.RAGE = 0;
            return 2*(rage+oppRage);
        } 
    },
    "JADE": {
        LIFE: 20,
        PUNCH: 2,
        KICK: 7,
        RAGE: 0,
        HITS: 0,
        SPECIAL(defender) {
            const rage = this.RAGE;
            this.RAGE = 0;
            return rage*this.HITS;
        } 
    },
    "ANNA": {
        LIFE: 18,
        PUNCH: 9,
        KICK: 1,
        RAGE: 0,
        HITS: 0,
        SPECIAL(defender) {
            const rage = this.RAGE;
            this.RAGE = 0;
            return (18-this.LIFE)*rage;
        }
    },
    "JUN": {
        LIFE: 60,
        PUNCH: 2,
        KICK: 1,
        RAGE: 0,
        HITS: 0,
        SPECIAL(defender) {
            const rage = this.RAGE;
            this.RAGE = 0;
            this.LIFE += rage;
            return rage;
        }
    },
};

const fighters = readline().split(' ');
const champ1 = fighters[0];
const champ2 = fighters[1];
const N = parseInt(readline());

let winner = "";
let loser = "";
for (let i = 0; i < N; i++) {
    const inputs = readline().split(' ');
    const d = inputs[0];
    const ATTACK = inputs[1];

    let attacker;
    let defender;
    if (d == '>') {
        attacker = char_sheet[champ1];;
        defender = char_sheet[champ2];
    } else {
        attacker = char_sheet[champ2];
        defender = char_sheet[champ1];
    }

    let damage;
    if(ATTACK === "SPECIAL") {
        damage = attacker.SPECIAL(defender);
    } else {
        damage = attacker[ATTACK];
    }

    defender.LIFE -= damage;
    defender.RAGE += 1;
    attacker.HITS += 1;

    if (defender.LIFE <= 0) {
        break;
    }
}

if (char_sheet[champ1].LIFE > char_sheet[champ2].LIFE) {
    winner = champ1;
    loser = champ2;
    winningHits = char_sheet[champ1].HITS;
} else {
    winner = champ2;
    loser = champ1;
    winningHits = char_sheet[champ2].HITS;
}

console.log(`${winner} beats ${loser} in ${winningHits} hits`);
