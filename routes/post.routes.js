const { Router } = require('express');
const router = Router();

const {
   getPatient,
   getPatientLastIndice,
   getPatientIndiceFromPeriod,
   getNecessaryDataByRangeOfValues,
   searchAllCaracteristicsOfDay,
   searchPatientsByPartOfName
} = require("../queries/getPatientInfo.queries")


module.exports = function (pool) {

   router.post("/getPatients", async (req, res) => {
      try {
         const { name, dateStart, dateEnd, searchForIndiceCardiaco, searchForIndicePulmonar } = await req.body;
         let patient = await getPatient(name, pool);
         let cpf = await patient[0].cpf;
         let lastIndiceCardiaco = [];
         let lastIndicePulmonar = [];

         if (searchForIndiceCardiaco) {
            if (dateStart) lastIndiceCardiaco = await getPatientIndiceFromPeriod(cpf, dateStart, dateEnd, "card", pool)
            else lastIndiceCardiaco = await getPatientLastIndice(cpf, "card", pool);
         }

         if (searchForIndicePulmonar) {
            if (dateStart) lastIndicePulmonar = await getPatientIndiceFromPeriod(cpf, dateStart, dateEnd, "pulm", pool);
            else lastIndicePulmonar = await getPatientLastIndice(cpf, "pulm", pool);
         }

         return res.status(200).json({
            message: "Os dados foram recebidos com sucesso",
            patient: patient[0],
            indiceCardiaco: lastIndiceCardiaco,
            indicePulmonar: lastIndicePulmonar
         })
      } catch (e) {
         res.status(500).json({ message: "Aconteceu alguma falha" })
      }
   })

   router.post("/searchAllCaracteristicsOfDay", async (req, res) => {
      try {
         const { date } = await req.body;
         let indicesCardiaco = await searchAllCaracteristicsOfDay(date, "card", pool);
         let indicesPulmonar = await searchAllCaracteristicsOfDay(date, "pulm", pool);

         return res.status(200).json({
            message: "Os dados foram recebidos com sucesso",
            indiceCardiaco: indicesCardiaco,
            indicePulmonar: indicesPulmonar
         })
      } catch (e) {
         res.status(500).json({ message: "Aconteceu alguma falha" })
      }
   })


   router.post("/getNecessaryDataByRangeOfValues", async (req, res) => {
      try {
         const { name, intervalObject, intervalStart, intervalFinal } = await req.body;
         let patient = await getPatient(name, pool);
         let cpf = await patient[0].cpf;
         let indice = await getNecessaryDataByRangeOfValues(cpf, intervalObject, intervalStart, intervalFinal, pool);

         return res.status(200).json({
            message: "Os dados foram recebidos com sucesso",
            patient: patient[0],
            indiceCardiaco: (intervalObject.includes("Cardiaco") ? indice : []),
            indicePulmonar: (intervalObject.includes("Pulmonar") ? indice : [])
         })
      } catch (e) {
         res.status(500).json({ message: "Aconteceu alguma falha" })
      }
   })

   router.post("/searchPatientsByPartOfName", async (req, res) => {
      try {
         const { partOfName } = req.body;
         let patients = await searchPatientsByPartOfName(partOfName, pool);
         return res.status(200).json({
            message: "Os dados foram recebidos com sucesso",
            patients,
         })
      } catch (e) {
         res.status(500).json({ message: "Aconteceu alguma falha" })
      }
   })

   return router;
}