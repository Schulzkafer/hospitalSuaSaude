## Hospital Sua Saúde

### Instalação

O projeto usa React.js, Node.js e MySQL.

1. `cd hospitalSuaSaude`
2. `npm install` 
3. `npm run dev` 

Dessa maneira, inicia-se o projeto no modo "desenvolvedor"

_Para usar o banco de dados, é necessário inserir seus próprios dados (`host`, `user`, `database`, `password`) no arquivo _`config/default.json`_


### Adição de dados ao DB

Para adicionar novos pacientes e seus índices ao banco de dados, pode ser integrado o projeto desse repositório https://github.com/Schulzkafer/DemoInsertDataIntoDB.
Nele se pode inserir o arquivo de pacientes.json ou de índices ao formulário correspondente (no projeto atual teria um formulário só para os dois tipos de arquivos). No arquivo de pacientes verifica-se que todos os pacientes têm todos os campos obrigatórios (`nome`, `idade` e `cpf`) e adicionam-se os dados ao DB. O arquivo de índices é convertido ao list e adicionado à sua tabela correspondente (o que contém `ind_card` vai para a tabela `indice_cardiaco`, o que contém `ind_pulm` vai para `indice_pulmonar`)
 
### Manual

Os arquivos apresentam diversas características sobre pacientes terminais internados em um hospital.
As seções oferecem as seguintes informações:

- Por paciente e dia:
              
     - consulta, para cada paciente, cada uma das características individualmente e cada uma delas sendo a mais recente disponível;

     - consulta em uma única chamada, todas as características de um paciente, com os valores mais recentes de cada uma;
                
     - consulta uma característica qualquer de um paciente para um intervalo de datas a ser especificado na chamada da API;
      
- Por intervalo de valores:</b> consulta o valor mais recente de uma característica de um paciente que esteja entre um intervalo de valores a ser especificado na chamada da API;
           
- Por parte do nome:</b> consulta pacientes que contenham um nome ou parte de um nome a ser especificado na chamada da API;
        
- Por dia:consulta para uma determinada data, todas as características existentes de todos os pacientes da base de dados.
     

#### Além disso, é possível:
- exportar as características de um ou mais pacientes para um arquivo CSV;
- exibir um gráfico temporal para um determinado paciente e uma determinada característica a ser inserida através da interface.
         
![busca por paciente e dia](https://i.ibb.co/cJtJbS2/Screenshot-176.png)

![graficos](https://i.ibb.co/M7pXbQV/Screenshot-177.png)

![busca por parte do nome](https://i.ibb.co/F76f4Yt/Screenshot-178.png)
