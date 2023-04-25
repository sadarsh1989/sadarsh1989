const fs = require('fs');

// Read the X12 834 file
const x12File = fs.readFileSync('/Users/sam/Coding/sample_edited.834', 'utf8');

// Split the X12 file by INS segment
const insSegments = x12File.split(/\r?\nINS\*/);

// Loop through each INS segment and process it as needed
for (let i = 1; i < insSegments.length; i++) {
  // Add 'INS' back to the beginning of each INS segment
  const insSegment = 'INS*' + insSegments[i];

  // Convert the parsed result to JSON
const jsonContent = JSON.stringify(insSegment, null, 2);

  // Write the JSON content to a file
fs.writeFileSync('/Users/sam/Coding/example.json', jsonContent, 'utf8');

  // Process the INS segment, e.g., parse it or perform some other operation
  console.log(`INS Segment ${i}:`, insSegment);
}
