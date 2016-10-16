import { Adapter } from 'ember-pouch';
import PouchDB from 'pouchdb';
import PouchAdapterCordovaSqlite from 'npm:pouchdb-adapter-cordova-sqlite';
import config from 'tidy-closet/config/environment';
import Ember from 'ember';

const { assert, isEmpty } = Ember;

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

export default Adapter.extend({
  init() {
    this._super(...arguments);
    this.set('db', createDb());
  }
});
