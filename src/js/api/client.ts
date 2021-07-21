import { isNull, isUndefined } from 'lodash';

export type Data = Record<string, string | number | boolean | null>;
type RequestOpts = RequestInit & { body?: string };

export type APIError = {
  status: string;
  data: {
    error: {
      code: string;
    };
  };
};

export const baseURL = process.env.BASE_API_URL
  ? `${window.location.protocol}//${process.env.BASE_API_URL}`
  : `${window.location.protocol}//${window.location.host}`;

const communityExtension = '/api/community';

function encodeQueryData(params: Data) {
  if (Object.keys(params).length === 0) return '';

  const ret: string[] = [];
  Object.entries(params)
    .filter(([, value]) => !isNull(value) && !isUndefined(value))
    .forEach(([key, value]) => {
      ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(value as string));
    });

  return '?' + ret.join('&');
}

function options(type: string, data: Data): RequestOpts {
  const options: RequestOpts = {
    method: type, // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors' as  RequestMode, // no-cors, *cors, same-origin
    cache: 'no-cache' as RequestCache, // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin' as RequestCredentials, // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow' as RequestRedirect, // manual, *follow, error
    referrerPolicy: 'no-referrer' as ReferrerPolicy, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url,
    body: ''
  };

  if (type != 'GET' && type != 'DELETE') {
    return Object.assign(options, { body: JSON.stringify(data) });
  } else {
    delete options.body;
    return options;
  }
}

// Allows hard override of url api extention. If you pass a url with /api/, it will use the raw url passed
// Else, will appent `/api/community`
export async function baseApi<T, Input>(url: string, type: string, data: Input | Data): Promise<T> {
  type = type.toUpperCase();
  let params = '';
  if (type === 'GET' || type === 'DELETE') params = encodeQueryData(data as Data);
  const queryURL = url.includes('/api/') ? url : `${communityExtension}${url}`;

  return fetch(`${baseURL}${queryURL}${params}`, options(type, data as Data)).then((response) => {
    // Catches and throws error with status and stringified error data.
    // Will also catch completely invalid errors, and just include status and whatever message exists
    // Please note, this will double stringify message.data aka. JSON.parse(JSON.parse(error).data)
    if (!response.ok) {
      return response
        .json()
        .then((data) => {
          throw new Error(JSON.stringify(data));
        })
        .catch((err) => {
          const error = JSON.stringify({
            status: response.statusText,
            data: err.message
          });
          throw new Error(error);
        });
    }

    if (response.redirected) {
      window.location.href = response.url;
    }

    return response.json().then((data) => {
      return data as T;
    });
  });
}

export function unwrapError(error: string) {
  const parsedError = JSON.parse(error);
  const data = JSON.parse(parsedError.data);

  return {
    ...parsedError,
    data
  };
}

export default {
  async get<Output, Input>(url: string, params: Data | Input) {
    return await baseApi<Output, Input>(url, 'GET', params);
  },
  async post<Output, Input>(url: string, data: Data | Input) {
    return await baseApi<Output, Input>(url, 'POST', data);
  },
  async put<Output, Input>(url: string, data: Data | Input) {
    return await baseApi<Output, Input>(url, 'PUT', data);
  },
  async delete<Output, Input>(url: string, params: Data | Input) {
    return await baseApi<Output, Input>(url, 'DELETE', params);
  }
};
