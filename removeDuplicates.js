// Example input data with INS segments
const fileData = [
  "INS|1|N3|A|B",
  "N3|C|D",
  "INS|2|N3|E|F",
  "N3|G|H",
  "N3|C|D", // Duplicate N3 segment
  "INS|3|N3|I|J",
  "N3|K|L",
  "N3|M|N",
  "N3|O|P",
  "INS|4|N3|Q|R",
  "N3|Q|R",
  "N3|S|T",
  "INS|5|N3|U|V",
  // ... more INS and N3 segments
];

// Function to remove duplicate N3 segments under each INS segment
function removeDuplicateN3Segments(fileData) {
  const insSegments = [];
  let currentInsSegment = null;

  // Iterate through each segment in the file
  for (const segment of fileData) {
    const segmentFields = segment.split("|");
    const segmentIdentifier = segmentFields[0];

    // If segment is an INS segment, update currentInsSegment
    if (segmentIdentifier === "INS") {
      if (currentInsSegment) {
        insSegments.push(currentInsSegment);
      }
      currentInsSegment = {
        segment: segment,
        n3Segments: new Set(), // Use Set to store unique N3 segments
      };
    }

    // If segment is an N3 segment, add it to currentInsSegment's n3Segments set
    if (segmentIdentifier === "N3" && currentInsSegment) {
      currentInsSegment.n3Segments.add(segment);
    }
  }

  // Push the last INS segment after loop ends
  if (currentInsSegment) {
    insSegments.push(currentInsSegment);
  }

  // Iterate through each INS segment and remove duplicate N3 segments
  for (const insSegment of insSegments) {
    insSegment.n3Segments.forEach((n3Segment) => {
      // Remove duplicate N3 segments from fileData
      const index = fileData.indexOf(n3Segment);
      if (index !== -1) {
        fileData.splice(index, 1);
      }
    });
  }

  return fileData;
}

const updatedFileData = removeDuplicateN3Segments(fileData);
console.log(updatedFileData);
