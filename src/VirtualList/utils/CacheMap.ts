// Firefox has low performance of map.
class CacheMap {
    maps: Record<string, number>;

    constructor() {
        this.maps = Object.create(null);
    }

    set(key: string | number, value: number) {
        this.maps[key] = value;
    }

    get(key: string | number) {
        return this.maps[key];
    }
}

export default CacheMap;
