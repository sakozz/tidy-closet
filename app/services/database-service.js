import PouchDB from 'pouchdb';
import PouchAdapterCordovaSqlite from 'npm:pouchdb-adapter-cordova-sqlite';
import config from 'tidy-closet/config/environment';
import Ember from 'ember';

const {
  assert,
  isEmpty
} = Ember;

function createDb() {
  let localDb = config.emberPouch.localDb;
  PouchDB.plugin(PouchAdapterCordovaSqlite);
  assert('emberPouch.localDb must be set', !isEmpty(localDb));

  let db = new PouchDB(localDb, {
    adapter: 'cordova-sqlite',
    iosDatabaseLocation: 'Library',
    androidDatabaseImplementation: 2
  });

  if (config.emberPouch.remoteDb) {
    let remoteDb = new PouchDB(config.emberPouch.remoteDb);

    db.sync(remoteDb, {
      live: true,
      retry: true
    });
  }

  return db;
}

function isBrowser() {
  if (navigator.userAgent.match(/chrome/i) ||
    navigator.userAgent.match(/safari/i) ||
    navigator.userAgent.match(/mozilla/i)) {
    return true;
  }
}

export default Ember.Service.extend({
  cordova: Ember.inject.service(),
  sqliteDb: null,
  sqliteIsSetup: false,
  setupDb: function() {
    let self = this;
    return new Promise(function(resolve, reject) {
      if (self.get('sqliteIsSetup')) {
        resolve(self.get('sqliteDb'));
      }
      if (isBrowser()) {
        let db = new PouchDB('tidycloset');
        self.set('sqliteDb', db);
        self.set('sqliteIsSetup', true);
        resolve(db);
      } else {
        self.get('cordova').on('deviceready', self, function() {
          if (window.sqlitePlugin) {
            let db = createDb();
            self.set('sqliteDb', db);
            self.set('sqliteIsSetup', true);
            resolve(db);
          } else {
            reject({
              success: false,
              message: 'sqlitePlugin not available'
            });
          }
        });

        self.get('cordova').on('backbutton', self, function() {
          window.history.back();
        });
      }
    });
  }
});
