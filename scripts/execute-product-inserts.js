const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

async function executeProductInserts() {
  try {
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, '..', 'sql', 'aluminum-products-insert.sql');
    const fileContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Extract SQL statements (everything after "=== Generated SQL Statements ===")
    const sqlStartMarker = '=== Generated SQL Statements ===';
    const sqlStartIndex = fileContent.indexOf(sqlStartMarker);
    
    if (sqlStartIndex === -1) {
      console.error('Could not find SQL statements in file');
      return;
    }
    
    const sqlContent = fileContent.substring(sqlStartIndex + sqlStartMarker.length).trim();
    
    // Split into individual INSERT statements
    const insertStatements = sqlContent
      .split('INSERT INTO products')
      .filter(stmt => stmt.trim().length > 0)
      .map(stmt => 'INSERT INTO products' + stmt.trim());
    
    console.log(`Found ${insertStatements.length} INSERT statements`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Execute each statement
    for (let i = 0; i < insertStatements.length; i++) {
      const statement = insertStatements[i];
      
      try {
        const { data, error } = await supabase.rpc('execute_sql', {
          query: statement
        });
        
        if (error) {
          console.error(`Error executing statement ${i + 1}:`, error.message);
          errorCount++;
        } else {
          console.log(`✓ Successfully executed statement ${i + 1}`);
          successCount++;
        }
      } catch (err) {
        console.error(`Exception executing statement ${i + 1}:`, err.message);
        errorCount++;
      }
    }
    
    console.log(`\n=== Execution Summary ===`);
    console.log(`Successful: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Total: ${insertStatements.length}`);
    
  } catch (error) {
    console.error('Error reading SQL file:', error);
  }
}

// Run the function
executeProductInserts();