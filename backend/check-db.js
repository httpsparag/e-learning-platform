const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function check() {
  try {
    console.log('\n=== CHECKING DATABASE ===\n');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'your-mongo-uri');
    console.log('Connected to MongoDB');
    
    // Define instructor model
    const instructorSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true, lowercase: true, trim: true },
      password: { type: String, select: false },
      status: String,
      isEmailVerified: Boolean,
    });
    
    const Instructor = mongoose.model('Instructor', instructorSchema);
    
    // Find the instructor
    const instructor = await Instructor.findOne({ 
      email: 'paragwakale23@gmail.com' 
    }).select('+password');
    
    if (!instructor) {
      console.log('Instructor not found');
      process.exit(0);
    }
    
    console.log('Found instructor:', instructor.email);
    console.log('Stored password:', instructor.password);
    console.log('Password length:', instructor.password.length);
    console.log('Starts with bcrypt prefix:', /^\$2[aby]\$/.test(instructor.password));
    
    // Try comparing
    const testPassword = 'TempPassword123!';
    const isMatch = await bcrypt.compare(testPassword, instructor.password);
    console.log('\nComparison with plain password:', isMatch);
    
    // Check if it looks like double-hashed
    if (isMatch === false && /^\$2[aby]\$/.test(instructor.password)) {
      console.log('\nInstructor password appears to be DOUBLE-HASHED');
      console.log('The pre-save hook likely hashed an already-hashed password');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

check();
