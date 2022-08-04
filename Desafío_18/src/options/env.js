import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
console.log(argv.port)
const port = argv.port || 8080;
export default port;