import app from './server/app';
import mongoose from 'mongoose';

after(function(done) {
  app.web2.on('close', () => done());
  mongoose.connection.close();
  app.web2.close();
});
