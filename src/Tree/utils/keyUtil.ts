import type { Key, KeyEntities, SafeKey } from '../typings';

export default function getEntity<T = any>(keyEntities: KeyEntities<T>, key: Key) {
    return keyEntities[key as SafeKey];
}
