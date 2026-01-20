const http = require('http');

async function resetPassword() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      email: 'paragwakale23@gmail.com',
      password: 'TempPassword123!'
    });

    const req = http.request('http://localhost:5000/api/organization/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          console.log('Response:', JSON.stringify(result, null, 2));
          resolve(result);
        } catch(e) {
          console.error('Parse error:', body);
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

resetPassword().then(() => {
  console.log('\nPassword reset complete! Now try logging in with:');
  console.log('Email: paragwakale23@gmail.com');
  console.log('Password: TempPassword123!');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
