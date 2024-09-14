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

const { select, input, checkbox } = require('@inquirer/prompts')

const fs = require("fs").promises

let mensagem = "Bem vindo ao App de Metas";

let metas

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch (error) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMetas = async () => {
    const meta = await input({ message: "Digite sua mensagem:"})

    if (meta.length == 0) {
        mensagem = "A meta está não poder ser vazia!";
        return
    }
    
    metas.push({ value: meta, checked: false})

    mensagem = "Meta cadastrada com Sucesso!";
}

const listarMetas = async () => {
    if (metas.length == 0) {
        mensagem = "Não existem metas!";
        return
    }

    const respostas = await checkbox({
        message: "Usar as setas para marcar e o enter para finalizar a tarefa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas.length == 0) {
        mensagem = "Sem respostas";
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) Concluidas!";
}

const metasRealizadas = async () => {
    if (metas.length == 0) {
        mensagem = "Não existem metas!";
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        mensagem = "Não existem metas realizadas :(";
        return
    }

    await select({
        message: "Metas Realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    if (metas.length == 0) {
        mensagem = "Não existem metas!";
        return
    }

    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0) {
        mensagem = "Não existem metas abertas";
        return
    }

    await select({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    if (metas.length == 0) {
        mensagem = "Não existem metas!";
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itensDeletar = await checkbox({
        message: "Selecione uma meta para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if (itensDeletar == 0) {
        mensagem = "Nenhum um item para deletar!";
        return
    }

    itensDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item 
        })
    })

    mensagem = "Metas Deletadas com Sucesso!";
}

const mostrarMensagem  = () => {
    console.clear();

    if (mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    await carregarMetas()

    while(true) {
        mostrarMensagem()
        await salvarMetas()

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
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar Metas",
                    value: "deletar"
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
                break

            case "listar":
                await listarMetas()
                break

            case "realizadas":
                await metasRealizadas()
                break

            case "abertas":
                await metasAbertas()
                break

            case "deletar":
                await deletarMetas()
                break

            case "sair":
                console.log("Até a proxima!")
                return
        }
    }
}

start()
