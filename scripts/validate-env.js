'use strict';

const required = ['DATABASE_URL', 'SESSION_SECRET', 'ADMIN_PASSWORD'];

const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  process.stderr.write(`Environment validation failed. Missing vars:\n  ${missing.join('\n  ')}\n`);
  process.exit(1);
}

const sessionSecret = process.env['SESSION_SECRET'] ?? '';
if (sessionSecret.length < 32) {
  process.stderr.write('SESSION_SECRET must be at least 32 characters.\n');
  process.exit(1);
}

process.stdout.write('Environment configuration is valid.\n');
