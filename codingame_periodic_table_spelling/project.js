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

const elements = new Map(allElements.map(x => [x.toLowerCase(), x]));

console.error(ele);

function checkForElements(word, builder, allWords) {
    
    if(word.length > 1) {
        const element = (word[0] + word[1]).toLowerCase();
        const ele = elements.get(element);
        if (ele) {
            nextWord = word.slice(2);
            builder.push(ele);

            checkForElements(nextWord);
        } else {
            // element name did NOT exist, probably return something like null/false saying it failed
        }
    }

    if(word.length === 1) {

    }

    //TODO: word.length === 0
}

console.log('spellings');
