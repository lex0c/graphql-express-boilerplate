import fetch from 'node-fetch';

import esConfig from '../../config/elasticsearch';

export const esFetch = (resource, method, body) => {
  return fetch(`${esConfig.host}/${resource}`, {
    method,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Charset": "utf-8"
    },
    body,
  }).then(res => res.json());
};

export const get = (resource, wildcard) => {
  const query = { query: { wildcard } };
  return esFetch(`${resource}/_search`, 'GET', JSON.stringify(query));
};

export const bulkSync = (type, data) => {
  let body = '';
  data.forEach(d => {
    body += `{ "index" : { "_index" : "${type}", "_id" : "${d.id}"} }\n`;
    body += `${JSON.stringify(d)}\n`;
  });
  return esFetch('_bulk', 'POST', body);
};

