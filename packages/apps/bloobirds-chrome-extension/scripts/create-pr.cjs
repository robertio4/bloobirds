// Cargar dependencias
const axios = require('axios');
require('dotenv').config();
const semver = require('semver');
const inquirer = require('inquirer');
const { version: currentVersion } = require('../package.json');

const [type] = process.argv;

// Variables de entorno
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'robertio4'; // Reemplaza con tu usuario o la organización
const REPO = 'bloobirds'; // Reemplaza con el nombre del repositorio
const SOURCE_BRANCH = 'develop'; // Reemplaza con el nombre de la rama de origen
const TARGET_BRANCH = 'production'; // Reemplaza con el nombre de la rama de destino
const PR_TITLE = 'Prerelease ' + semver.inc(currentVersion, 'prerelease', 'beta'); // Reemplaza con el título de la PR
const PR_BODY = 'Descripción de la PR';

const getVersionPrompt = async currentVersion => {
  const choices = [
    'Prerelease',
    'Prepatch',
    'Preminor',
    'Premajor',
    'Patch',
    'Minor',
    'Major',
    'custom',
  ];

  const formattedChoices = choices.map(choice => {
    if (choice === 'custom') {
      return {
        name: 'Custom Version',
        value: choice,
      };
    } else {
      const newVersion = semver.inc(currentVersion, choice.toLowerCase(), 'beta');
      return {
        name: `${choice} (${newVersion}) ${
          choice === 'Prerelease' ? '-> Recommended For Beta Version' : ''
        }`,
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
    newVersion = semver.inc(currentVersion, version.toLowerCase(), 'beta');
  }

  if (newVersion.includes('beta')) {
    newVersion = `Prerelease ${newVersion}`;
  } else {
    newVersion = `Release ${newVersion}`;
  }

  return newVersion;
};

// Configurar el cliente de axios
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  },
});

// Función para crear una Pull Request
async function createPullRequest() {
  const title = await getVersionPrompt(currentVersion);

  try {
    const response = await githubApi.post(`/repos/${OWNER}/${REPO}/pulls`, {
      title,
      head: SOURCE_BRANCH,
      base: TARGET_BRANCH,
      //body: PR_BODY,
    });

    console.log('Pull Request creada:', response.data.html_url);
  } catch (error) {
    console.error('Error al crear la Pull Request:', error.response.data);
  }
}

// Ejecutar la función
createPullRequest();
