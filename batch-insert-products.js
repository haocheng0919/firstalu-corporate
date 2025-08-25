const fs = require('fs');
const path = require('path');

// Read the SQL file
const sqlContent = fs.readFileSync('extracted-sql.sql', 'utf8');

// Split into individual INSERT statements
const insertStatements = sqlContent
  .split('INSERT INTO products')
  .filter(stmt => stmt.trim())
  .map(stmt => 'INSERT INTO products' + stmt.trim());

console.log(`Found ${insertStatements.length} INSERT statements`);

// Group statements into batches of 5
const batchSize = 5;
const batches = [];
for (let i = 0; i < insertStatements.length; i += batchSize) {
  batches.push(insertStatements.slice(i, i + batchSize));
}

console.log(`Created ${batches.length} batches`);

// Write each batch to a separate file
batches.forEach((batch, index) => {
  const batchContent = batch.join('\n\n');
  const filename = `batch-${index + 1}.sql`;
  fs.writeFileSync(filename, batchContent);
  console.log(`Written ${filename} with ${batch.length} statements`);
});

console.log('All batches created successfully!');