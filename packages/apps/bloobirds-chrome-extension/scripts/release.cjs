const semver = require('semver');
const inquirer = require('inquirer');
const { execSync } = require('child_process');
const { version: currentVersion } = require('../package.json');
const glob = require('glob');

const MANIFEST_PATH = 'src/manifest.json';
const DIST_PATH = 'packages/apps/bloobirds-chrome-extension/dist';
const RELEASES_PATH = 'packages/apps/bloobirds-chrome-extension/releases';

const getVersionPrompt = async currentVersion => {
  const choices = ['Patch', 'Minor', 'Major', 'Prerelease', 'custom'];

  const formattedChoices = choices.map(choice => {
    if (choice === 'custom') {
      return {
        name: 'Custom Version',
        value: choice,
      };
    } else {
      const newVersion = semver.inc(currentVersion, choice.toLowerCase());
      return {
        name: `${choice} (${newVersion})`,
        value: choice,
      };
    }
  });

  const questions = [
    {
      type: 'list',
      name: 'version',
      message: 'Select a new version:',
      choices: formattedChoices,
    },
    {
      type: 'input',
      name: 'customVersion',
      message: 'Enter a custom version:',
      when: answers => {
        return answers.version === 'custom';
      },
      validate: input => {
        const valid = semver.valid(input);
        const gt = semver.gt(input, currentVersion);
        if (!valid) {
          return 'Please enter a valid semver version.';
        }
        if (!gt) {
          return `Please enter a version greater than the current version (v${currentVersion}).`;
        }
        return true;
      },
    },
  ];

  const { customVersion, version } = await inquirer.prompt(questions);

  let newVersion;
  if (version === 'custom') {
    newVersion = customVersion;
  } else {
    newVersion = semver.inc(currentVersion, version.toLowerCase());
  }

  console.log(`The new version is: ${newVersion}`);

  return newVersion;
};

const main = async () => {
  // 1. Incrementar la versión en package.json y manifest.json

  // Obtener la nueva versión
  const newVersion = await getVersionPrompt(currentVersion);

  // Incrementar la versión en package.json
  execSync(`cd packages/apps/bloobirds-chrome-extension && npm version ${newVersion}`);

  // Incrementar la versión en manifest.json
  //const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH));
  //manifest.version = newVersion;
  //fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  //execSync(`echo ${newVersion} > ../version.txt`);

  // 2. Crear el build
  console.log('Building...');
  execSync(`npm run extension:build:release`, { stdio: 'ignore' });

  //console.log('Minimize...');
  //execSync(
  //  'npx uglifyjs packages/apps/bloobirds-chrome-extension/dist/content/index.js -o packages/apps/bloobirds-chrome-extension/dist/content/index.js --compress --mangle'
  //);
  //const files = glob.sync('packages/apps/bloobirds-chrome-extension/dist/chunks/core-*.js');
  //files.forEach(file => {
  //  try {
  //    execSync(`uglifyjs "${file}" -o "${file}" --compress --mangle`);
  //  } catch (error) {
  //    console.error(`Error al minificar el archivo ${file}: ${error.stderr.toString()}`);
  //  }
  //});

  // 3. Crear la release en sentry
  console.log('Creating release and upload sourcemaps in sentry...');
  execSync(`cd packages/apps/bloobirds-chrome-extension && npm run sentry:release:create`);
  execSync(`cd packages/apps/bloobirds-chrome-extension && npm run sentry:sourcemaps`);
  execSync(`cd packages/apps/bloobirds-chrome-extension && npm run sentry:release:finalize`);

  // 4. Borrar todos los .map
  console.log('Deleting the sourcemaps from the build...');
  execSync(`find packages/apps/bloobirds-chrome-extension/dist -type f -name '*.map' -delete`);

  // 5. Crear el zip
  console.log('Creating zip...');
  execSync(`zip -r bloobirds-chrome-extension-${newVersion}.zip ${DIST_PATH}`);
  execSync(`mv bloobirds-chrome-extension-${newVersion}.zip ${RELEASES_PATH}`);

  // 6. Crear el commit y el tag
  console.log('Creating commit and tag...');
  execSync(`git add .`);
  execSync(`git commit -m "chore: bump version to v${newVersion}"`);
  execSync(`git push`);

  execSync(`git tag -a v${newVersion} -m "v${newVersion}"`);
  execSync(`git push origin v${newVersion}`);
};

main();
