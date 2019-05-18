import * as _ from 'lodash';

export function isWidgetLike(value: boolean): boolean {
  const widgetLikeProperties = ['id', 'cid', 'title', 'setting'];
  return isObjectLike(value, widgetLikeProperties);
}

export function isWidgetPrototypeLike(value: any): boolean {
  const widgetPrototypeLikeProperties = ['group', 'key', 'label', 'desc'];
  return isObjectLike(value, widgetPrototypeLikeProperties);
}

export function isObjectLike(value: any, properties: string[]) {
  if (!value || !_.isObject(value) || _.isEmpty(value)) {
      return false;
  }

  const anyNotMatch = properties.some(it => !_.has(value, it));

  return !anyNotMatch;
}
