const fs = require('fs');

const fileContent = fs.readFileSync('/Users/sam/Coding/sample_edited.834', 'utf8');

// Split the file into segments
const segments = fileContent.split(/~\r?\n/);

// Initialize an empty array to store the extracted data
const extractedData = [];

// Loop over each segment
for (let i = 0; i < segments.length; i++) {
  const segment = segments[i];

  // Extract the segment ID (e.g. INS, NM1, etc.)
  const segmentId = segment.substring(0, 3);

  // Extract the segment data (excluding the segment ID and trailing '~' character)
  const segmentData = segment.substring(3, segment.length - 4);

  // Initialize an empty object to store the extracted data from the current segment
  const currentSegmentData = {};

  // Extract relevant data from the current segment based on the segment ID
  switch(segmentId) {
    case 'INS':
      // Example: INS*1**18*030105919*...
      const [ins01, ins03, ins04] = segmentData.split('*');
      currentSegmentData.ins01 = ins01;
      currentSegmentData.ins03 = ins03;
      currentSegmentData.ins04 = ins04;
      break;
    case 'NM1':
      // Example: NM1*1P*1*DOE*JOHN****MI*11122333301...
      const [nm101, nm102, nm103, nm104, nm109] = segmentData.split('*');
      currentSegmentData.nm101 = nm101;
      currentSegmentData.nm102 = nm102;
      currentSegmentData.nm103 = nm103;
      currentSegmentData.nm104 = nm104;
      currentSegmentData.nm109 = nm109;
      break;
    case 'PER':
      // Example: PER*IC*JANE DOE*TE*5555551212*...
      const [per01, per02, per03, per04] = segmentData.split('*');
      currentSegmentData.per01 = per01;
      currentSegmentData.per02 = per02;
      currentSegmentData.per03 = per03;
      currentSegmentData.per04 = per04;
      break;
    case 'N3':
      // Example: N3*100 MAIN ST*SUITE 300...
      const [n301, n302] = segmentData.split('*');
      currentSegmentData.n301 = n301;
      currentSegmentData.n302 = n302;
      break;
    case 'N4':
      // Example: N4*NEW YORK*NY*10001...
      const [n401, n402, n403] = segmentData.split('*');
      currentSegmentData.n401 = n401;
      currentSegmentData.n402 = n402;
      currentSegmentData.n403 = n403;
      break;
    case 'DMG':
      // Example: DMG*D8*19800101*M...
      const [dmg01, dmg02, dmg03] = segmentData.split('*');
      currentSegmentData.dmg01 = dmg01;
      currentSegmentData.dmg02 = dmg02;
      currentSegmentData.dmg03 = dmg03;
      break;
    default:
      // Skip other segment types
      continue;
  }

  // Add the extracted data to the array
  extractedData.push(currentSegmentData);
}

// Write the extracted data to a JSON
console.log(extractedData);
fs.writeFileSync('/Users/sam/Coding/output_1.json', JSON.stringify(extractedData, null, 2));
