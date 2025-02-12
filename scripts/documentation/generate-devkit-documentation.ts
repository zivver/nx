import { execSync, ExecSyncOptions } from 'child_process';
import { join } from 'path';
import * as chalk from 'chalk';

export function generateDevkitDocumentation() {
  console.log(`\n${chalk.blue('i')} Generating Documentation for Devkit\n`);

  const execSyncOptions: ExecSyncOptions = {
    stdio: process.env.CI === 'true' ? 'inherit' : 'ignore',
  };

  execSync('nx build typedoc-theme', execSyncOptions);

  execSync(
    `rm -rf docs/default/api-nx-devkit && npx typedoc packages/devkit/index.ts packages/devkit/ngcli-adapter.ts --tsconfig packages/devkit/tsconfig.lib.json --out ./docs/default/api-nx-devkit --hideBreadcrumbs true --disableSources --publicPath ../../default/nx-devkit/ --theme dist/typedoc-theme/src/lib --readme none`,
    execSyncOptions
  );
  execSync(
    `rm -rf docs/default/api-nx-devkit/modules.md docs/default/api-nx-devkit/.nojekyll`,
    execSyncOptions
  );
  execSync(
    `rm -rf docs/default/api-nx-devkit/modules.md docs/default/api-nx-devkit/README.md`,
    execSyncOptions
  );
  execSync(
    `npx prettier docs/default/api-nx-devkit --write --config ${join(
      __dirname,
      '..',
      '..',
      '.prettierrc'
    )}`,
    execSyncOptions
  );
}
