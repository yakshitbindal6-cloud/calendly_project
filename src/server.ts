import {app} from './app.js';
import { PORT } from './config/env.js';
import { connectToDatabase } from './config/database.js';


 async function startServer() {
    await connectToDatabase();
   app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer().catch((error)=>{
  console.error('Error starting the server:', error);
  process.exit(1);
});