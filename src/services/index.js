import { reduce, merge } from 'lodash';
import path from 'path';
import fs from 'fs';

const services = [];

try {
  const normalizedPath = path.join(__dirname);
  fs.readdirSync(normalizedPath).forEach(curr => {
    const pathToLoad = `${normalizedPath}/${curr}`;
    if (fs.statSync(pathToLoad).isDirectory()) {
      fs.readdirSync(pathToLoad).forEach(file => {
        if (file === 'index.js') services.push(require(`${pathToLoad}/${file}`).default);
      });
    }
  });
} catch (err) {
  global.console.error(err);
}

export default {
  schemas: services.map(service => service.schemas),
  resolvers: reduce(services, (acc, service) => merge(acc, service.resolvers), {}),
};
