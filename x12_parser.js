const fs = require('fs');
const { stdout } = require('process');
//const csv = require('csv-parser');

// Read the X12 834 file
const x12File = fs.readFileSync('/Users/SamuelAdarshDarla/Desktop/coding/project_mirth/js/sample_edited.edi', 'utf8');

// Split the X12 file by INS segment
//const insSegments = x12File.split(/\r?\nINS\*/);
const insSegments = x12File.split(/INS\*/);

// Loop through each INS segment and process it as needed
for (let i = 1; i < insSegments.length; i++) {
  // Add 'INS' back to the beginning of each INS segment
  const insSegment = 'INS*' + insSegments[i];//.replace(/[\r\n]+/g,"");
  //const insSegment = 'INS*' + insSegments[i];

  //const replaceCarriageReturns = insSegment.replace('\r','|');

  //const myArray = replaceCarriageReturns.split("\r\n");

  //const myRows = myArray.join("<br>");

  // Process the INS segment, e.g., parse it or perform some other operation
  console.log(`INS Segment ${i}:`, insSegment);
  //console.log(myRows);
//fs.writeFileSync('/Users/SamuelAdarshDarla/Desktop/coding/project_mirth/js/test1,txt', 'utf8');
fs.writeFile('/Users/SamuelAdarshDarla/Desktop/coding/project_mirth/js/test_output.csv',insSegment, (err) => {
  if (err) throw err;
  //console.log('file was sucessfulyl wtittten!');
});
}
