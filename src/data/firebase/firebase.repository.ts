import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseRepository<T> {
  private db: admin.database.Database;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: admin.app.App) {
    this.db = firebaseApp.database();
  }

  private getRef(collection: string): admin.database.Reference {
    return this.db.ref(collection);
  }

  async getAll(collection: string): Promise<T[]> {
    const snapshot = await this.getRef(collection).once('value');
    return snapshot.val();
  }

  async getById(collection: string, id: string): Promise<T> {
    const snapshot = await this.getRef(collection).child(id).once('value');
    return snapshot.val();
  }

  async create(collection: string, id: string, data: T): Promise<void> {
    await this.getRef(collection).child(id).set(data);
  }

  async update(
    collection: string,
    id: string,
    data: Partial<T>,
  ): Promise<void> {
    await this.getRef(collection).child(id).update(data);
  }

  async delete(collection: string, id: string): Promise<void> {
    await this.getRef(collection).child(id).remove();
  }

  async getSubCollection(
    parentCollection: string,
    parentId: string,
    subCollection: string,
  ): Promise<T[]> {
    const snapshot = await this.getRef(
      `${parentCollection}/${parentId}/${subCollection}`,
    ).once('value');
    return snapshot.val();
  }

  async createSubCollection(
    parentCollection: string,
    parentId: string,
    subCollection: string,
    data: T,
  ): Promise<void> {
    await this.getRef(`${parentCollection}/${parentId}/${subCollection}`).push(
      data,
    );
  }

  async createSubCollectionWithoutId(
    parentCollection: string,
    parentId: string,
    subCollection: string,
    data: T,
  ): Promise<void> {
    await this.getRef(`${parentCollection}/${parentId}/${subCollection}`).set(
      data,
    );
  }

  async removeSubCollection(
    parentCollection: string,
    parentId: string,
    subCollection: string,
    subCollectionId: string,
  ): Promise<void> {
    await this.getRef(
      `${parentCollection}/${parentId}/${subCollection}/${subCollectionId}`,
    ).remove();
  }

  async removeEntireSubCollection(
    parentCollection: string,
    parentId: string,
    subCollection: string,
  ): Promise<void> {
    await this.getRef(
      `${parentCollection}/${parentId}/${subCollection}`,
    ).remove();
  }

  async updateSubCollection(
    parentCollection: string,
    parentId: string,
    subCollection: string,
    subCollectionId: string,
    data: Partial<T>,
  ): Promise<void> {
    await this.getRef(
      `${parentCollection}/${parentId}/${subCollection}/${subCollectionId}`,
    ).update(data);
  }

  async updateEntireSubCollection(
    parentCollection: string,
    parentId: string,
    subCollection: string,
    data: Partial<T>,
  ): Promise<void> {
    await this.getRef(`${parentCollection}/${parentId}/${subCollection}`).set(
      data,
    );
  }
}
