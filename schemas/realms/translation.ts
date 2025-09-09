import Realm, {BSON} from 'realm';

export class Translation extends Realm.Object {
  _id!: string;
  language!: string;
  namespace!: string;
  data!: string;

  static schema = {
    name: "Translation",
    primaryKey: "_id",
    properties: {
      _id: "string",
      language: "string",
      namespace: "string",
      data: "string",
    },
  };
}
