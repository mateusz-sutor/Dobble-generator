import fs from 'fs';
import chalk from 'chalk';

const numberOfElementsPerCard = parseInt(process.argv.splice(2)[0]);

const createAlphabet = (n) => {
    const alpha = Array.from(Array(n)).map((e, i) => i + 65);
    return alpha.map((x) => String.fromCharCode(x));
}

//crucial variables
const matrix = Array.from(Array(numberOfElementsPerCard-1), () => Array.from(Array(numberOfElementsPerCard-1)));
const rest = Array(numberOfElementsPerCard);
const alphabet = createAlphabet((numberOfElementsPerCard*(numberOfElementsPerCard-1)+1));
let alphabetIndex = 0;

//fill vertical
matrix.forEach(element=>{
    element.fill(alphabet[alphabetIndex]);
    alphabetIndex++;
});

//fill horizontal
for(let i = 0; i < numberOfElementsPerCard-1; i++){
    for(let j = 0; j < numberOfElementsPerCard-1; j++){
        matrix[j][i] += (' ' +  alphabet[alphabetIndex]);
    }
    alphabetIndex++;
}

//fill diagonal
for(let i = 0; i <  numberOfElementsPerCard-1; i++){
    for(let j = 1; j < numberOfElementsPerCard-1; j++){
        for(let k = 0; k <  numberOfElementsPerCard-1; k++){
            let length = k*j + i;
            while(length > numberOfElementsPerCard-2){ length -=  (numberOfElementsPerCard-1)};
            matrix[k][length] += (' ' +  alphabet[alphabetIndex]);
        }
        alphabetIndex++;
    }
}

//fill rest
rest.fill(alphabet[alphabetIndex]);
alphabetIndex = 0;
for(let i = 0; i < numberOfElementsPerCard; i++){
    for(let j = 0; j < numberOfElementsPerCard-1; j++){
        rest[i] +=(' ' +  alphabet[alphabetIndex]);
        alphabetIndex++;
    }
}

// console.log(matrix)
// console.log(rest)

//save to file
try {
    const stream = fs.createWriteStream('dobble.txt');
    matrix.forEach(element => {
        element.forEach( el => {
            stream.write(el + '\n');
        });
    });
    rest.forEach(el => {
        stream.write(el + '\n');
    })
    stream.end();
    console.log(chalk.green('Dobble Matrix was saved! :D'));
} catch (error) {
    console.log(chalk.red('Error: ' + error));
}
