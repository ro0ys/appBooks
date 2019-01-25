import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() {
    this.getBooks();
  }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks(){
    firebase.database().ref('/books').set(this.books);
  }

  getBooks(){
    firebase.database().ref('/books').on(
      'value', (data: DataSnapshot) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
    );
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then (
        () => {
          console.log('Photo supprimée.');
        },
        (error) => {
          console.log('Fichier non trouvé: ' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref().child('image/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log("Chargement en cours");
        },
        (error) => {
          console.log("Erreur de chargement: " + error);
          reject();
        },
        () => {
          console.log(upload.snapshot.ref.getDownloadURL());
          resolve(upload.snapshot.ref.getDownloadURL());
        }
        );
      }
    );
  }
}