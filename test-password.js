const bcrypt = require('bcryptjs');

const testPassword = 'TempPassword123!';

// Simulate what happens when password is stored
async function test() {
  try {
    console.log('\n=== PASSWORD HASHING TEST ===\n');
    
    // Test 1: Normal hashing flow
    console.log('Test 1: Fresh hash from plain password');
    const salt = await bcrypt.genSalt(10);
    const hash1 = await bcrypt.hash(testPassword, salt);
    console.log('Hashed password:', hash1);
    console.log('Hashed length:', hash1.length);
    
    // Test 2: Comparing the same password
    console.log('\nTest 2: Compare plain password with fresh hash');
    const match1 = await bcrypt.compare(testPassword, hash1);
    console.log('Match result:', match1);
    
    // Test 3: What if we hash an already hashed password?
    console.log('\nTest 3: Double hashing (hash the hash)');
    const salt2 = await bcrypt.genSalt(10);
    const hash2 = await bcrypt.hash(hash1, salt2);
    console.log('Double-hashed:', hash2);
    console.log('Double-hashed length:', hash2.length);
    
    // Test 4: Compare plain password with double-hashed
    console.log('\nTest 4: Compare plain password with double-hashed');
    const match2 = await bcrypt.compare(testPassword, hash2);
    console.log('Match result:', match2);
    console.log('(Should be false!)');
    
    // Test 5: What needs to be compared with double-hashed
    console.log('\nTest 5: Compare single-hash with double-hashed');
    const match3 = await bcrypt.compare(hash1, hash2);
    console.log('Match result:', match3);
    console.log('(Should be false - different hashes)');
    
    console.log('\n=== CONCLUSION ===');
    console.log('If password is double-hashed in DB, bcrypt.compare(plainPassword, dbPassword) will FAIL');
    console.log('Solution: Need to fix DB to contain only single-hashed password');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
