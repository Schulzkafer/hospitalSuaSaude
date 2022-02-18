import { React } from "react";



const Handbook = () => {

   return (
      <div className="mx-auto my-5 px-5 pb-5" style={{ maxWidth: "50rem" }}>
         <p className="biggerText">Os arquivos apresentam diversas características sobre pacientes terminais internados em um hospital.</p>
         <p className="biggerText">As seções oferecem as seguintes informações:</p>
         <ul>

            <li><b>Por paciente e dia:</b>
               <ul>
                  <li>consulta, para cada paciente, cada uma das características individualmente e cada uma delas sendo a mais recente disponível;</li>

                  <li>consulta em uma única chamada, todas as características de um paciente, com os valores mais recentes de cada uma;
                  </li>

                  <li>consulta uma característica qualquer de um paciente para um intervalo de datas a ser especificado na chamada da API;
                  </li>
               </ul>
            </li>

            <li><b>Por intervalo de valores:</b> consulta o valor mais recente de uma característica de um paciente que esteja entre um intervalo de valores a ser especificado na chamada da API;
            </li>

            <li><b>Por parte do nome:</b> consulta pacientes que contenham um nome ou parte de um nome a ser especificado na chamada da API;
            </li>

            <li><b>Por dia:</b> consulta para uma determinada data, todas as características existentes de todos os pacientes da base de dados.
            </li>

         </ul>

         <p className="biggerText">Além disso, é possível:</p>
         <ul>
            <li>exportar as características de um ou mais pacientes para um arquivo CSV;</li>
            <li>exibir um gráfico temporal para um determinado paciente e uma determinada característica a ser inserida através da interface.</li>
         </ul>

      </div>
   )


}

export default Handbook;