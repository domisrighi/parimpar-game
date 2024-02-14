const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const usuariosRegistrados = [
    { nomeDeUsuario: 'usuario1', senha: 'senha1' },
    { nomeDeUsuario: 'usuario2', senha: 'senha2' }
];

function autenticarUsuario() {
    rl.question('Digite o nome de usuário: ', (nomeDeUsuario) => {
        rl.question('Digite a senha: ', (senha) => {
            const usuario = usuariosRegistrados.find(id => id.nomeDeUsuario === nomeDeUsuario);

            if (usuario && usuario.senha === senha) {
                console.log(`Bem-vindo(a) ${usuario.nomeDeUsuario}! \n`);
                menu();
            } else {
                console.log('Falha no login. Nome de usuário ou senha inválida!');
                rl.close();
            }
        });
    });
}

function exibirInstrucoes(exibir){
    console.log('-> Leia as instruções a seguir: \n');
    exibir();
}

function instrucoes(){
    console.log('1º Jogador A escolhe um número.');
    console.log('2º Jogador B escolhe um número sem saber o número de A.');
    console.log('3º Para a vitória, se A escolhe par, B deve escolher par; se A escolhe ímpar, B deve escolher ímpar.');
    console.log('4º Se B escolhe ímpar enquanto A escolheu par (ou vice-versa), B perde.\n');
    rl.question(`Digite "jogar" pra iniciar o jogo:\n`, (jogar) => {
        if (jogar === "jogar"){
            iniciarJogo();
        }
    })
}

function menu(){
    exibirInstrucoes(instrucoes);
}

function ehPar(numero) {
    return numero % 2 === 0;
}

function iniciarJogo() {
    console.log('Bem-vindo(a) ao jogo de adivinhação!');
    rl.question('Jogador A, escolha um número: ', (entradaA) => {
        rl.output.write("\x1b[1A");
        rl.output.write("\x1b[K");

        const numeroA = parseInt(entradaA);

        if (isNaN(numeroA)) {
            console.log('Entrada inválida. Digite apenas números!!');
            iniciarJogo();
            return;
        }

        rl.question('Jogador B, escolha um número: ', (entradaB) => {
            const numeroB = parseInt(entradaB);

            if (isNaN(numeroB)) {
                console.log('Entrada inválida. Digite apenas números!!');
                iniciarJogo();
                return;
            }

            const numeroAPar = ehPar(numeroA);
            const numeroBPar = ehPar(numeroB);

            if ((numeroAPar && numeroBPar) || (!numeroAPar && !numeroBPar)) {
                console.log(`Jogador A escolheu o número ${numeroA}, então Jogador B venceu!`);
            } else {
                console.log(`Jogador A escolheu o número ${numeroA}, então Jogador B perdeu!`);
            }
            rl.close();
        });
    });
}

autenticarUsuario();