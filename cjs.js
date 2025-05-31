const { exec } = require('child_process');

// Gabungkan semua argumen setelah "node /run.cjs"
const command = process.argv.slice(2).join(' ');

if (!command) {
  console.error('❌ Tidak ada perintah yang diberikan. Gunakan: node /run.cjs <perintah>');
  process.exit(1);
}

console.log(`▶️ Menjalankan perintah: ${command}`);

const child = exec(command, { cwd: process.cwd(), env: process.env });

// Tampilkan output stdout
child.stdout.on('data', data => process.stdout.write(data));

// Tampilkan output stderr
child.stderr.on('data', data => process.stderr.write(data));

// Handle saat proses selesai
child.on('exit', code => {
  console.log(`⚙️ Proses selesai dengan kode: ${code}`);
  process.exit(code);
});
