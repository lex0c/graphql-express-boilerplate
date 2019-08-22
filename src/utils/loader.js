import cache from './cache';

export default async ({ cacheKey, loaderInstance, keys }) => {
  const resp = loaderInstance.load(keys);
  return Promise.race([
    cache(cacheKey, resp),
    resp,
  ]);
};
