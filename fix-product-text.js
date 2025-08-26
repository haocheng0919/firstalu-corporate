const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '/Users/haochengwang/Desktop/claude/firstalu/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixProductText() {
  console.log('Starting to fix product text...');

  // Update introduction field from "professional use" to "disposable use"
  const { error: introError } = await supabase
    .from('products')
    .update({
      introduction: { en: 'Premium disposable product designed for one-time use.' }
    })
    .like('introduction->>en', '%professional use%');

  if (introError) {
    console.error('Error updating introductions:', introError);
  } else {
    console.log('✅ Updated product introductions');
  }

  console.log('Finished updating product text!');
}

fixProductText();
