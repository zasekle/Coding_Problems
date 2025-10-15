const TEMPLATES = {
    KEN: {
        baseLife: 25,
        punch: 6,
        kick: 5,
        special(def) {
            const r = this.rage;
            this.rage = 0;
            return 3*r;
        }
    },
    RYU: {
        baseLife: 25,
        punch: 4,
        kick: 5,
        special(def) {
            const r = this.rage;
            this.rage = 0;
            return 4*r;
        }
    },
    TANK: {
        baseLife: 50,
        punch: 2,
        kick: 2,
        special(def) {
            const r = this.rage;
            this.rage = 0;
            return 2*r;
        } 
    },
    VLAD: {
        baseLife: 30,
        punch: 3,
        kick: 3,
        special(def) {
            const r = this.rage;
            const oppRage = def.rage;
            this.rage = 0;
            def.rage = 0;
            return 2*(r+oppRage);
        } 
    },
    JADE: {
        baseLife: 20,
        punch: 2,
        kick: 7,
        special(def) {
            const r = this.rage;
            this.rage = 0;
            return r*this.hits;
        } 
    },
    ANNA: {
        baseLife: 18,
        punch: 9,
        kick: 1,
        special(def) {
            const r = this.rage;
            this.rage = 0;
            return (this.baseLife-this.life)*r;
        }
    },
    JUN: {
        baseLife: 60,
        punch: 2,
        kick: 1,
        special(_) {
            const r = this.rage;
            this.rage = 0;
            this.life += r;
            return r;
        }
    },
}

function createFighter(name) {
    const t = TEMPLATES[name];
    return {
        name,
        baseLife: t.baseLife,
        life: t.baseLife,
        rage: 0,
        hits: 0,
        punch: t.punch,
        kick: t.kick,
        special: t.special,
    };
}

function applyMove(attacker, defender, move) {
    const dmg = move === "SPECIAL"
        ? attacker.special(defender)
        : attacker[move.toLowerCase()];

    defender.life -= dmg;
    defender.rage += 1;
    attacker.hits += 1;
    return defender.life <= 0;
}

const [p1Name, p2Name] = readline().trim().split(" ");
const n = parseInt(readline());

const p1 = createFighter(p1Name);
const p2 = createFighter(p2Name);

for (let i = 0; i < n; i++) {
    const [dir, move] = readline().trim().split(" ");
    const attacker = dir === ">" ? p1 : p2;
    const defender = dir === ">" ? p2 : p1;

    const ko = applyMove(attacker, defender, move);
    if (ko) break;
}

const winner = p1.life > p2.life ? p1 : p2;
const loser = winner === p1 ? p2 : p1;

console.log(`${winner.name} beats ${loser.name} in ${winner.hits} hits`);
