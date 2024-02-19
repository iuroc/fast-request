/**
 * State Group
 * @author iuroc
 */
export class SG<T = any> {
    public constructor(private init: T) { }

    public get<Key extends keyof T>(key: Key): T[Key] {
        return this.init[key]
    }
    public obj<Key extends keyof T>(key: Key) {
        return new SG(this.init[key])
    }
    public set<Key extends keyof T>(key: Key, value: T[Key]) {
        this.init[key] = value
    }
}