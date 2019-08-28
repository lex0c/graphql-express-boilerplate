import fetch from 'node-fetch';
import { exec } from 'child_process';

import esConfig from '../../config/elasticsearch';

export const esFetch = (resource, method, body = null) => {
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

export const esGet = (resource, query) => {
  return new Promise((resolve, reject) => {
    const curl = `curl -XGET ${esConfig.host}/${resource}/_search -H 'Content-Type: application/json' -d '${query}'`;
    exec(curl, (err, stdout) => {
      if (err) reject(err);
      resolve(stdout);
    });
  });
};

export const esBulkSync = (type, data) => {
  let body = '';
  data.forEach(d => {
    body += `{ "index" : { "_index" : "${type}", "_id" : "${d.id}"} }\n`;
    body += `${JSON.stringify(d)}\n`;
  });
  return esFetch('_bulk', 'POST', body);
};

