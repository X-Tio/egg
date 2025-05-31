import { exec } from 'node:child_process';
import { cwd, env, exit, argv, stdout, stderr } from 'node:process';

// Gabungkan argumen menjadi satu perintah
const command = argv.slice(2).join(' ');

if (!command) {
  console.error('❌ Tidak ada perintah yang diberikan. Gunakan: node run.mjs <perintah>');
//  exit(1);
}

console.log(`▶️ Menjalankan perintah: ${command}`);

const child = exec(command, { cwd: cwd(), env });

child.stdout.on('data', data => stdout.write(data));
child.stderr.on('data', data => stderr.write(data));

child.on('exit', code => {
  console.log(`⚙️ Proses selesai dengan kode: ${code}`);
  exit(code);
});
