import { mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
mkdirSync('dist', { recursive: true });
copyFileSync('index.html', 'dist/index.html');

// O mesmo layout atende domínios com códigos de verificação diferentes.
const html = readFileSync('index.html', 'utf8');
const tag = /<meta name="facebook-domain-verification" content="[^"]*"\s*\/>/g;
if ([...html.matchAll(tag)].length !== 1) {
  throw new Error('Esperada exatamente uma metatag de verificação no HTML base.');
}
mkdirSync('dist/domain-verification', { recursive: true });
writeFileSync(
  'dist/domain-verification/jogodabolinha.html',
  html.replace(tag, '<meta name="facebook-domain-verification" content="hvige0lbmqnk51gj16d84m52hyp6qj" />'),
);
