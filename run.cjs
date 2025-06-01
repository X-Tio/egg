const { spawn } = require('child_process');
const { argv, env, cwd, exit } = require('process');

// Ambil perintah dari argumen
const command = argv.slice(2);

// Fungsi untuk jalankan perintah
function runCommand(cmd, args) {
  const child = spawn(cmd, args, {
    stdio: 'inherit',
    cwd: cwd(),
    env: env,
  });

  child.on('exit', code => {
    console.log(`🔚 Proses keluar dengan kode: ${code}`);
    exit(code);
  });
}

if (command.length === 0) {
  console.log('ℹ️ masukan cmd..');
  runCommand('/bin/sh', []);
} else {
  console.log(`▶️ Menjalankan perintah: ${command.join(' ')}`);
  runCommand(command[0], command.slice(1));
}
