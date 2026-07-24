/** Helper method to fetch oembed data  */
const fetchingOembed = async (
  src: string,
  type: 'youtube' | 'vimeo' = 'youtube'
): Promise<Response> => {
  const url =
    type === 'youtube'
      ? `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${getYouTubeID(src)}&format=json`
      : `https://vimeo.com/api/oembed.json?url=${src}`;

  return await window.fetch(url);
};

/** Helper method to dynamically create iframe  */
const createIframe = (
  videoID: string,
  urlCompare: string,
  getTitle: string,
  iframeClass: string,
  iframePolicy: string,
  type: 'youtube' | 'vimeo',
  flag = true
): HTMLIFrameElement | null => {
  let iframeEl: HTMLIFrameElement | null = null;
  if (flag) {
    iframeEl = document.createElement('iframe');

    if (type === 'youtube') {
      const mergedUrl = mergeQueryParams(
        `https://www.youtube.com/embed/${videoID}?enablejsapi=1&autoplay=1`,
        urlCompare
      );
      iframeEl.setAttribute('src', mergedUrl);
    } else {
      const mergedUrl = mergeQueryParams(
        `https://player.vimeo.com/video/${videoID}?autoplay=1`,
        urlCompare
      );
      iframeEl.setAttribute('src', mergedUrl);
    }
    iframeEl.setAttribute('frameborder', '0');
    iframeEl.setAttribute(
      'allow',
      'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
    );
    iframeEl.setAttribute('allowfullscreen', '1');
    iframeEl.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframeEl.setAttribute('title', `${getTitle}`);
    iframeEl.setAttribute('class', `${iframeClass}`);
    if (['anonymous', 'credentialless'].includes(iframePolicy)) {
      iframeEl.setAttribute(`${iframePolicy}`, '');
    }
  }

  return iframeEl;
};

/** Helper method to check if postMessage features is available  */
const isPostMessageSupported = (): boolean => {
  if (!window.postMessage) {
    return false;
  }
  return true;
};

/** Helper method to calculate aspect  */
const calcAspect = (aspect: string): number => {
  const aspects = aspect.split(':');

  return typeof aspects[1] === 'undefined'
    ? 56.25
    : (Number(aspects[1]) / Number(aspects[0])) * 100;
};

/** Helper method to get youtube video ID from url  */
const getYouTubeID = (url: string): string => {
  const urlParts = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/u);
  /* eslint-disable no-useless-escape */
  return urlParts[2] !== undefined ? urlParts[2].split(/[^\w\-]/iu)[0] : urlParts[0];
};

/** Helper method to get vimeo video ID from url  */
const getVimeoID = (url: string): string | undefined => {
  return new URL(url).pathname.split('/').pop();
};

/** Merges parameters ensuring there are no duplicates */

const mergeQueryParams = (urlBase: string, urlToCompare: string): string => {
  const parseUrl = (url: string) => {
    const [base, queryString] = url.split('?');
    const params = new URLSearchParams(queryString || '');
    return { base, params };
  };

  const baseObj = parseUrl(urlBase);
  const compareObj = parseUrl(urlToCompare);

  compareObj.params.forEach((value, key) => {
    if (!baseObj.params.has(key)) {
      baseObj.params.set(key, value);
    }
  });

  return `${baseObj.base}?${baseObj.params.toString()}`;
};

/** Helper method to get Thumbnail for youtube video */
const getYoutubeThumbnail = (
  video_id: string,
  quality?: 'default' | 'medium' | 'high' | 'standard' | 'maxres'
): string | false => {
  if (video_id) {
    const qualityValue = quality || 'high';

    let quality_key = 'maxresdefault'; // Max quality
    if (qualityValue === 'default') {
      quality_key = 'default';
    } else if (qualityValue === 'medium') {
      quality_key = 'mqdefault';
    } else if (qualityValue === 'high') {
      quality_key = 'hqdefault';
    } else if (qualityValue === 'standard') {
      quality_key = 'sddefault';
    } else if (qualityValue === 'maxres') {
      quality_key = 'maxresdefault';
    }

    return 'https://img.youtube.com/vi/' + video_id + '/' + quality_key + '.jpg';
  }

  return false;
};

/** Helper method to get Thumbnail for vimeo video */
const getVimeoThumbnail = (
  video_id: string,
  quality?: 'default' | 'medium' | 'high' | 'standard' | 'maxres'
): string | false => {
  if (video_id) {
    const qualityValue = quality || 'high';

    let quality_key = '960x540';
    if (qualityValue === 'default') {
      quality_key = '200x150';
    } else if (qualityValue === 'medium') {
      quality_key = '295x166';
    } else if (qualityValue === 'high') {
      quality_key = '640x360';
    } else if (qualityValue === 'standard') {
      quality_key = '960x540';
    } else if (qualityValue === 'maxres') {
      quality_key = '1280x720';
    }
    return 'https://i.vimeocdn.com/video/' + video_id + '_' + quality_key + '.jpg';
  }

  return false;
};

export {
  createIframe,
  isPostMessageSupported,
  calcAspect,
  fetchingOembed,
  getYouTubeID,
  getYoutubeThumbnail,
  getVimeoID,
  getVimeoThumbnail,
};
