## Environment Variables

<p align="right">[<a href="EnvVariables.md">中文</a> | <a href="EnvVariables-en.md">English</a>]</p>

Copy `.env.example` to `.env` and set both variables. For GitHub Actions deployments, set the same variables in `ENV_FILE`.

| Variable | Description |
| --- | --- |
| `PUBLIC_ARTALK_HOST` | The public URL of the Artalk server, such as `https://artalk.example.com` |
| `PUBLIC_ARTALK_SITE_NAME` | The site name in Artalk, such as `cloverta-blog` |

Add the blog's origin to Artalk's trusted domains. Articles use `/posts/…/` and `/series/…/` as discussion keys, shared across languages.

If you connect a local preview to this Artalk server, add its exact origin, such as `http://localhost:4321`, to Artalk's `trusted_domains`. Match the scheme, hostname, and port in the browser. Restart Artalk after editing `data/artalk.yml` on the server.
