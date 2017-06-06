
const isDevMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'develop' || process.env.NODE_ENV === 'development';

// JsonModel Property Decorator
export const JsonModelProperty = (target: any, key: string) => {
  const getter = function (this: any) {
    return this.__JsonModel__values[key];
  };

  const setter = function (this: any, newValue: any) {
    this.__JsonModel__values[key] = newValue;
    if (isDevMode && this.__JsonModel__history) {
      this.__JsonModel__history.push(this.toJson());
    }
  };

  if (delete target[key]) {
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: false,
    });
  }
}

// JsonModel Class
export abstract class JsonModel<T> {
  protected __JsonModel__original: T;
  protected __JsonModel__history: T[];
  protected __JsonModel__values: T;

  constructor(json: T) {
    this.__JsonModel__original = json;
    this.__JsonModel__values = <any>{};

    if (isDevMode) {
      this.__JsonModel__history = [];
    }
  }

  public toJson(): T {
    return <T> Object.keys((<any>this).__JsonModel__values).reduce((json, key) => ({
      ...json,
      [key]: ((<any>this).__JsonModel__values)[key],
    }), {});
  }
}
