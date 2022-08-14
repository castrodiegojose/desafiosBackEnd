import { Application } from "./deps.ts";
import router from './src/routes/routes.ts';

// const router = new Router() 
const app: Application = new Application();

app.use(router.routes())
// app.use(router.allowedMethods())

app.listen({port: 8000});
console.log(`server on running con localhost port: 8000`);



