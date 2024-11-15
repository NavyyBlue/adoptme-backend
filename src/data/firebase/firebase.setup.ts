import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as admin from 'firebase-admin';

let app: admin.app.App = null;

@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    if (!admin.apps.length) {
      const firebaseServiceAccountFile = await readFile(
        'firebase_credentials.json',
        'utf8',
      );
      const serviceAccount = await JSON.parse(firebaseServiceAccountFile);
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`,
      });
    } else {
      app = admin.app();
    }
  }

  setup(): admin.app.App {
    return app;
  }
}
