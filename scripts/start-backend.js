#!/usr/bin/env node
/**
 * Script universal para iniciar el backend
 * Funciona en Windows, Linux y Mac
 * Detecta automáticamente python o python3
 */

const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

const isWindows = os.platform() === 'win32';
const backendDir = path.join(__dirname, '..', 'backend');

// Detectar qué comando Python está disponible
function getPythonCommand() {
  return new Promise((resolve) => {
    const testPython = spawn(isWindows ? 'python' : 'python', ['--version'], {
      stdio: 'ignore'
    });
    
    testPython.on('close', (code) => {
      if (code === 0) {
        resolve('python');
      } else {
        // Intentar con python3
        const testPython3 = spawn('python3', ['--version'], {
          stdio: 'ignore'
        });
        
        testPython3.on('close', (code3) => {
          if (code3 === 0) {
            resolve('python3');
          } else {
            console.error('❌ ERROR: Python no está instalado');
            process.exit(1);
          }
        });
      }
    });
  });
}

async function startBackend() {
  console.log('🚀 Iniciando backend...\n');
  
  const pythonCmd = await getPythonCommand();
  console.log(`✅ Usando: ${pythonCmd}\n`);
  
  const backend = spawn(pythonCmd, ['run_dev.py'], {
    cwd: backendDir,
    stdio: 'inherit',
    shell: isWindows
  });
  
  backend.on('error', (err) => {
    console.error('❌ Error iniciando backend:', err);
    process.exit(1);
  });
  
  backend.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ Backend terminó con código ${code}`);
      process.exit(code);
    }
  });
}

startBackend();

