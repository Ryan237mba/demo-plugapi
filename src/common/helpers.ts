import {
  BadRequestException,
  HttpException,
  NotImplementedException,
} from '@nestjs/common';
import slugify from 'slugify';

export const sendError = (exception: any) => {
  console.error(exception);
  if (exception.status) throw exception;
  if (
    exception.name &&
    ['CastError', 'MongoServerError'].includes(exception.name)
  ) {
    throw new BadRequestException(exception.message);
  }
  if (exception.message.includes('not implemented')) {
    throw new NotImplementedException(exception.message);
  }
  throw new HttpException(exception, 500);
};

export function toBoolean(value: string): boolean {
  value = value.toLowerCase();

  return value === 'true' || value === '1' ? true : false;
}

/**
 * Parse any object to string value
 *
 * @param obj The object to parse
 * @returns The given object to string
 */
export const stringify = (obj: any) => JSON.stringify(obj);

/**
 * Get a unique slug from a string
 * @param value The string to slugify
 * @returns unique slugified string
 */
export const uniqSlug = (value: string) => {
  return `${Date.now()}-${slugify(value, { lower: true, trim: true })}`;
};
