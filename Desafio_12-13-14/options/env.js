import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const modo = argv.modo || "FORK";
export default modo;