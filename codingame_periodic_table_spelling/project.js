const word = readline();

const allElements = [
    "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P",
    "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu",
    "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc",
    "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La",
    "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu",
    "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At",
    "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es",
    "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh",
    "Fl", "Mc", "Lv", "Ts", "Og"];

const ele = new Map(allElements.map(x => [x.toLowerCase(), x]));

function checkForElements(word, builder, allCombos) {
    for (let i = 0; i < 2; i++) {
        if(word.length > i) {
            const start = word.substring(0, i+1).toLowerCase();
            const elem = ele.get(start);
            if (elem) {
                builder.push(elem);
                const new_word = word.slice(i+1);
    
                if (new_word.length === 0) {
                    allCombos.push(builder.join(""));
                } else {
                    checkForElements(new_word, builder, allCombos);
                }
                builder.pop();
            }
        }
    }
}

const builder = [];
const allCombos = [];

checkForElements(word, builder, allCombos);

allCombos.length === 0 ? console.log("none") : allCombos.map(x => console.log(x));
