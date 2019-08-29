import { populateESUsers } from './es-sync.job';
populateESUsers().then(() => process.exit(1));
