const fs = require("fs");
const path = require("path");

module.exports = (data) => {
  console.log("The data to write to the file:", data);

  try {
    // Construct the path to the file
    const filePath = path.join(__dirname, "..", "data", "movies_data.json");

    // Write data to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log("Data successfully written to the file.");
  } catch (err) {
    console.error("Error writing to the file:", err);
  }
};

