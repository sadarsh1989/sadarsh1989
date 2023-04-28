const fs = require('fs');
const csv = require('csv-parser');

const filePath = '/path/to/csv/file.csv'; // Replace with your CSV file path
const delimiter = ','; // Replace with your CSV delimiter
const columnName = 'columnName'; // Replace with the name of the column to modify

fs.createReadStream(filePath)
  .pipe(csv({ separator: delimiter }))
  .on('data', row => {
    const value = row[columnName];
    const index = value.indexOf(delimiter);
    const newValue = index >= 0 ? value.substring(0, index) : value; // Keep everything before the delimiter, or the entire string if the delimiter is not found
    row[columnName] = newValue; // Update the value of the column
    // Do something with the modified row (e.g. write it to a new CSV file)
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
  });
