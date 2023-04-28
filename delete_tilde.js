const fs = require('fs');
const csv = require('csv-parser');

const filePath = '/path/to/csv/file.csv'; // Replace with your CSV file path
const delimiter = ','; // Replace with your CSV delimiter

fs.createReadStream(filePath)
  .pipe(csv({ separator: delimiter }))
  .on('data', row => {
    const segments = row['columnName'].split(delimiter); // Replace with the name of the column that contains the segments
    const newSegments = segments.slice(0, 13); // Keep the first 13 segments and discard the rest
    const newRow = newSegments.join(delimiter); // Join the remaining segments with the CSV delimiter
    // Do something with the new row (e.g. write it to a new CSV file)
    console.log(newRow);
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
  });
