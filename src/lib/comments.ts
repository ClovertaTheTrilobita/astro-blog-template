export const commentService = {
  host: import.meta.env.PUBLIC_ARTALK_HOST?.trim().replace(/\/+$/, ''),
  site: import.meta.env.PUBLIC_ARTALK_SITE_NAME?.trim(),
};
