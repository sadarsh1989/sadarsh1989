const fs = require('fs');

const fileContent = fs.readFileSync('/Users/sam/Coding/sample_edited.834', 'utf8');

// Split the file into segments
const segments = fileContent.split(/~\r?\n/);

// Initialize an empty array to store the extracted data
const extractedData = [];

// Initialize a flag to determine whether to skip segments
let skipSegments = false;

// Loop over each segment
for (let i = 0; i < segments.length; i++) {
  const segment = segments[i];

  // Extract the segment ID (e.g. INS, NM1, etc.)
  const segmentId = segment.substring(0, 3);

  // Check if the current segment is a DMG segment
  if (segmentId === 'DMG') {
    // Add the DMG segment to the extracted data array
    extractedData.push(segment);

    // Set the skipSegments flag to true to skip segments until the DTP segment is reached
    skipSegments = true;
  } else if (segmentId === 'DTP') {
    // Add the DTP segment to the extracted data array
    extractedData.push(segment);

    // Set the skipSegments flag to false to include segments until the next DMG segment is reached
    skipSegments = false;
  } else if (!skipSegments) {
    // Add the segment to the extracted data array if skipSegments is false
    extractedData.push(segment);
  }
}

// Join the extracted segments into a single string
const outputContent = extractedData.join('~\r\n');

// Write the modified content to a new file
fs.writeFileSync('/Users/sam/Coding/output_edited.834', outputContent);
