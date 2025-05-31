import { exec } from 'node:child_process';
import { cwd, env, argv, stdout, stderr } from 'node:process';

// Gabungkan argumen menjadi satu perintah
const command = argv.slice(2).join(' ');

if (!command) {
  console.log('ℹ️ Tidak ada perintah diberikan. Menunggu hingga container dihentikan...');
  // Dummy loop agar tidak keluar
  setInterval(() => {}, 1000); // tetap hidup
} else {
  console.log(`▶️ Menjalankan perintah: ${command}`);

  const child = exec(command, { cwd: cwd(), env });

  child.stdout.on('data', data => stdout.write(data));
  child.stderr.on('data', data => stderr.write(data));

  child.on('exit', code => {
    console.log(`⚙️ Proses selesai dengan kode: ${code}`);
    exit(code);
  });
}
