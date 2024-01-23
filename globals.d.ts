// https://stackoverflow.com/questions/68481686/type-typeof-globalthis-has-no-index-signature

import type { MongoClient } from "mongodb";

declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>;
  }
}
