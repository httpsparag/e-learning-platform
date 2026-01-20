/**
 * Generate a unique, secure temporary password for instructor invitations
 * Format: 8 uppercase + 4 numbers + 1 special character
 * Example: ABCDEFGH1234!
 */
export function generateTemporaryPassword(): string {
  // Generate random uppercase letters
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let password = '';
  
  // Add 8 random uppercase letters
  for (let i = 0; i < 8; i++) {
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
  }
  
  // Add 4 random numbers
  for (let i = 0; i < 4; i++) {
    password += Math.floor(Math.random() * 10);
  }
  
  // Add 1 special character
  const specialChars = '!@#$%^&*';
  password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  
  return password;
}

/**
 * Alternative: Generate simple alphanumeric password
 * Format: 12 random alphanumeric characters
 * Example: Xy7Kp2mQn9Aw
 */
export function generateSimplePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
