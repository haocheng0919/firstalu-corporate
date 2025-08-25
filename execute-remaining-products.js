const fs = require('fs');

// Read the remaining SQL file
const remainingSQL = fs.readFileSync('remaining-batches.sql', 'utf8');

// Split into individual INSERT statements
const insertStatements = remainingSQL
  .split('\n')
  .filter(line => line.trim().startsWith('INSERT INTO products'))
  .map(line => line.trim());

console.log(`Found ${insertStatements.length} remaining INSERT statements`);

// Group statements into batches of 5 for easier processing
const batchSize = 5;
const batches = [];

for (let i = 0; i < insertStatements.length; i += batchSize) {
  const batch = insertStatements.slice(i, i + batchSize);
  batches.push(batch.join('\n') + '\nON CONFLICT (slug) DO NOTHING;');
}

console.log(`Created ${batches.length} batches`);

// Write each batch to a separate file for manual execution
batches.forEach((batch, index) => {
  const filename = `remaining-batch-${index + 1}.sql`;
  fs.writeFileSync(filename, batch);
  console.log(`Written ${filename}`);
});

console.log('\nAll remaining batches prepared. Execute them via Supabase MCP apply_migration.');
console.log('\nSummary of remaining products to add:');
console.log('- Wrinklewall Rectangle containers: ~21 more');
console.log('- Wrinklewall Round containers: 18');
console.log('- Wrinklewall Square containers: 2');
console.log('\nTotal remaining: ~41 products');