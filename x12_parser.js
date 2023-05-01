const fs = require('fs');

// Read the X12 834 file
const x12File = fs.readFileSync('/Users/sam/Coding/sample_edited.834', 'utf8');

// Split the X12 file by INS segment
const insSegments = x12File.split(/INS\*/);

// Accumulate all INS segments into a string
let output = '';
for (let i = 1; i < insSegments.length; i++) {
  const insSegment = 'INS*' + insSegments[i];
  output += insSegment + '\n';
}

// Write the accumulated string to a file
fs.writeFileSync('/Users/sam/Coding/output.csv', output);
