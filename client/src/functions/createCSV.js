import getTime from "./getTime";


function createCSV(rows) {
   rows = rows.map(obj => {
      if ("ind_card_EPOC" in obj) obj["ind_card_EPOC"] = getTime(obj["ind_card_EPOC"])
      else if ("ind_pulm_EPOC" in obj) obj["ind_pulm_EPOC"] = getTime(obj["ind_pulm_EPOC"])
      return Object.entries(obj).map(ar => ar.join(":"))
   })

   let csvContent = "data:text/csv;charset=utf-8,"
      + rows.map(e => e.join(", ")).join("\n");
   var encodedUri = encodeURI(csvContent);
   var link = document.createElement("a");
   link.setAttribute("href", encodedUri);
   link.setAttribute("download", "my_data.csv");
   document.body.appendChild(link);
   link.click();
}

export default createCSV;