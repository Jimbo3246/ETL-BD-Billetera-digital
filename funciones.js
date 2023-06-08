function copyYapetoBD() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = spreadsheet.getSheetByName("YAPE");
  const destinationSheet = spreadsheet.getSheetByName("BD_YAPE");

  const lastRow = sourceSheet.getLastRow();
  const lastColumn = sourceSheet.getLastColumn();

  const sourceRange = sourceSheet.getRange(1, 1, lastRow, lastColumn);

  const values = sourceRange.getValues();

  // Obtener el mes actual y el mes anterior
  const today = new Date();
  const currentMonth = today.getMonth();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1).getMonth();

  const filteredData = values.filter(function(item) {
    const itemDate = new Date(item[5]); // Suponiendo que item[5] es una fecha válida en tu hoja de cálculo
    const itemMonth = itemDate.getMonth();

    // Filtrar solo los datos del mes anterior
    return item[0] == "TE PAGÓ" && itemMonth === lastMonth && item[1] != "LILIANA ERIKA RIVERA ALVA";
  });

  // Reemplazar punto por coma en el elemento item[3]
  const processedData = filteredData.map(function(item) {
    item[3] = item[3].toString().replace(".", ",");
    return item;
  });

  const destinationRange = destinationSheet.getRange(destinationSheet.getLastRow() + 1, 1, processedData.length, lastColumn);
  destinationRange.setValues(processedData);

}


