// Hello Word!
 //console.log("Olá Mundo!");

// let mensagem = "Olá Mundo!";
// console.log(mensagem);

// const frase = "Muito Prazer";

// {
//    const frase = "Obrigado";
//    console.log(frase);
// }

// console.log(frase);

// let metasMax = ["JejeDev", "Develop"];
// console.log(metasMax[0] + " " + metasMax[1]);

// let meta = {
//    value: "Ler um livro inteiro por mês",
//    checked: true,
//    address: 232444
// }

// let metas = [
//    meta,

//    {
//        value: "Treinar todos os dias",
//        checked: false,
//    } 
// ]

// console.log(metas[0].value)

// const criarMeta = () => {
//    console.log("")
// }

// function criarMetas () {
//    console.log("")
// }

const { select, input } = require('@inquirer/prompts')

let meta = {
    value: "Dormir 7 horas",
    checked: false,
}

let metas =  [ meta ]

const cadastrarMetas = async () => {
    const meta = await input({ message: "Digite sua mensagem:"})

    if (meta.length == 0) {
        console.log("A meta está não poder ser vazia!")
        return
    }
    
    metas.push({ value: meta, checked: false})
}

const start = async () => {

    while(true) {
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar Meta",
                    value: "cadastrar"
                },
                {
                    name: "Listas Metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch (opcao) {
            case "cadastrar":

                await cadastrarMetas()
                console.log(metas)
                break
            case "listar":

                console.log("Revisando conteudos de JavaScript")
                break
            case "sair":

                console.log("Até a proxima!")
                return
        }
    }
}

start()
