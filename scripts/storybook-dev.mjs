#!/usr/bin/env node
/**
 * Start Storybook on a fixed port after freeing stale listeners (Windows-friendly).
 */
import { execSync, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = process.env.STORYBOOK_PORT ?? '6006';
const playgroundDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'playground');

function killPort(port) {
  if (process.platform !== 'win32') {
    try {
      execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'ignore', shell: true });
    } catch {
      // port free
    }
    return;
  }

  try {
    const out = execSync(`netstat -ano | findstr ":${port}"`, { encoding: 'utf8' });
    const pids = new Set();
    for (const line of out.split(/\r?\n/)) {
      if (line.includes('LISTENING')) {
        const pid = line.trim().split(/\s+/).at(-1);
        if (pid && /^\d+$/.test(pid)) pids.add(pid);
      }
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
      } catch {
        // already gone
      }
    }
  } catch {
    // port free
  }
}

killPort(PORT);

console.log(`Starting Storybook on http://localhost:${PORT}/`);

const result = spawnSync('npx', ['storybook', 'dev', '-p', PORT, '--no-open'], {
  cwd: playgroundDir,
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status ?? 1);
