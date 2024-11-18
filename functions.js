// List of element abrivations in order of atomic number
const elements = [
    "H", "He",
    "Li", "Be", "B", "C", "N", "O", "F", "Ne",
    "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar",
    "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr",
    "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe",
    "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn",
    "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"
];

const alkali = [3, 11, 19, 37, 55, 87];
const alkaliEarth = [4, 12, 20, 38, 56, 88];
const lanthanoid = [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 79, 70, 71];
const actinoid = [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103];
const transition = [21,22,23,24,25,26,27,28,29,30,39,40,41,42,43,44,45,46,47,48,72,73,74,75,76,77,78,79,80,104,105,106,107,108];
const postTransition = [13, 31, 49, 50, 81, 82, 83, 84];
const metalloid = [5, 14, 32, 33, 51, 52, 85];
const reactiveNonmetal = [1, 6, 7, 8, 9, 15, 16, 17, 34, 35, 53]
const noble = [2, 10, 18, 36, 54, 86]
const space = [elements.length+1]


// Function which returns a boolean based on whether input string can be spelled using periodic table abriviations
function periodicMatch(string, allowSpaces = false) {
    let matchStrings = [];
    elements.forEach(item=>matchStrings.push(item.toUpperCase()));
    if (allowSpaces) {
        matchStrings.push(" ");
    };

    const regex = new RegExp("^((" + matchStrings.join(")|(") + "))+$", "g");

    return string.toUpperCase().match(regex) != null;
}


// Function which returns an array of objects with each object containing a string of the spelling, and the atomic numbers of elements used in the spelling (or 119 for space)
function periodicSpell(string, allowSpaces = false) {
    let matchStrings = Array.from(elements);
    if (allowSpaces) {
        matchStrings.push(" ");
    };

    let listA = [{nums: [], length:0, string:''}]


    while (true) {
        let listB = [];

        listA.forEach(test => {
            if (test.string.toUpperCase() == string.toUpperCase()) {
                listB.push(test)
                return
            }

            matchStrings.forEach((matchString, n) => {
                if (test.length + matchString.length > string.length)
                    return
                if (matchString.toUpperCase() == string.toUpperCase().slice(test.length, test.length + matchString.length)) {
                    let outputNums = Array.from(test.nums)
                    outputNums.push(n+1);
                    listB.push({nums: outputNums, length:test.length + matchString.length, string: test.string + matchString})
                }
            });
        });

        if (JSON.stringify(listA) == JSON.stringify(listB)) {
            listA.forEach((item, i, array) => {
                delete item.length;
            });

            return listA;
            break
        }

        listA = Array.from(listB);
    }
}

