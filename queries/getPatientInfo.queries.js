const getPatient = (name, pool) => {
   return new Promise((resolve, reject) => {
      pool.query(`SELECT nome, idade, cpf FROM pacientes WHERE nome = ? LIMIT 1`, [name], (error, elements) => {
         return (error) ? reject(error) : resolve(elements)
      });
   });
}

const getPatientLastIndice = (cpf, object, pool) => {
   let query;

   switch (object) {

      case "card":
         query = `SELECT (data_exam) as ind_card_data, (EPOC) as ind_card_EPOC, (ind_card) as ind_card_value
   FROM indice_cardiaco 
   WHERE cpf = ? and data_exam = (SELECT MAX(data_exam)
   FROM indice_cardiaco 
   WHERE cpf = ?)`;
         break;

      case "pulm":
         query = `SELECT (data_exam) as ind_pulm_data, (EPOC) as ind_pulm_EPOC, (ind_pulm) as ind_pulm_value
    FROM indice_pulmonar 
    WHERE cpf = ? and data_exam = (SELECT MAX(data_exam)
    FROM indice_pulmonar 
    WHERE cpf = ?)`;
         break;
   }
   return new Promise((resolve, reject) => {
      pool.query(query, [cpf, cpf], (error, elements) => {
         return (error) ? reject(error) : resolve(elements)
      });
   });
}

const getPatientIndiceFromPeriod = (cpf, dataBegin, dataEnd, object, pool) => {
   if (dataEnd === "") dataEnd = dataBegin;
   let query;
   switch (object) {

      case "card":
         query = `SELECT (data_exam) as ind_card_data, (EPOC) as ind_card_EPOC, (ind_card) as ind_card_value
   FROM indice_cardiaco 
   WHERE cpf = ? and data_exam >= ? and data_exam <= ?`;
         break;

      case "pulm":
         query = `SELECT (data_exam) as ind_pulm_data, (EPOC) as ind_pulm_EPOC, (ind_pulm) as ind_pulm_value
   FROM indice_pulmonar 
   WHERE cpf = ? and data_exam >= ?  and data_exam <= ?`;
         break;
   }
   return new Promise((resolve, reject) => {
      pool.query(query, [cpf, dataBegin, dataEnd], (error, elements) => {
         return (error) ? reject(error) : resolve(elements)
      });
   });
}

const getNecessaryDataByRangeOfValues = (cpf, intervalObject, intervalStart, intervalFinal, pool) => {
   let query;

   switch (intervalObject) {

      case "Indice Cardiaco Valor":
         query = `SELECT data_exam as ind_card_data, EPOC as ind_card_EPOC, ind_card as ind_card_value 
         FROM indice_cardiaco 
         where data_exam = (SELECT max(data_exam)  FROM indice_cardiaco 
         WHERE cpf = ? and ind_card >= ? and ind_card <= ?) 
         and cpf = ? and ind_card >= ? and ind_card <= ?`;
         break;

      case "Indice Pulmonar Valor":
         query = `SELECT data_exam as ind_pulm_data, EPOC as ind_pulm_EPOC, ind_pulm as ind_pulm_value 
         FROM indice_pulmonar 
         where data_exam = (SELECT max(data_exam)  FROM indice_pulmonar 
         WHERE cpf = ? and ind_pulm >= ? and ind_pulm <= ?) 
         and cpf = ? and ind_pulm >= ? and ind_pulm <= ?`;
         break;
   }

   return new Promise((resolve, reject) => {
      pool.query(query, [cpf, intervalStart, intervalFinal, cpf, intervalStart, intervalFinal], (error, elements) => {
         return (error) ? reject(error) : resolve(elements)
      });
   });
}

const searchAllCaracteristicsOfDay = (date, object, pool) => {
   let query;

   switch (object) {

      case "card":
         query = `SELECT (indice_cardiaco.CPF) as cpf, (data_exam) as ind_card_data, (EPOC) as ind_card_EPOC, (ind_card) as ind_card_value,
      pacientes.nome, pacientes.idade
      FROM indice_cardiaco 
      inner join pacientes on pacientes.CPF = indice_cardiaco.CPF 
      WHERE data_exam = ?`;
         break;

      case "pulm":
         query = `SELECT (indice_pulmonar.CPF) as cpf, (data_exam) as ind_pulm_data, (EPOC) as ind_pulm_EPOC, (ind_pulm) as ind_pulm_value,
      pacientes.nome, pacientes.idade
      FROM indice_pulmonar 
       inner join pacientes on pacientes.CPF = indice_pulmonar.CPF 
      WHERE data_exam = ?`;
         break;
   }
   return new Promise((resolve, reject) => {
      pool.query(query, [date], (error, elements) => {
         return (error) ? reject(error) : resolve(elements)
      });
   });
}

const searchPatientsByPartOfName = (partOfName, pool) => {
   let query = `SELECT nome, idade, cpf FROM pacientes
   WHERE nome LIKE '%${partOfName}%'`;
   return new Promise((resolve, reject) => {
      pool.query(query, (error, elements) => {
         return (error) ? reject(error) : resolve(elements)
      });
   });
}


module.exports = {
   getPatient,
   getPatientLastIndice,
   getPatientIndiceFromPeriod,
   getNecessaryDataByRangeOfValues,
   searchAllCaracteristicsOfDay,
   searchPatientsByPartOfName
}

