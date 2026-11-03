## 环境变量说明

<p align="right">[<a href="EnvVariables.md">中文</a> | <a href="EnvVariables-en.md">English</a>]</p>

将 `.env.example` 复制为 `.env`，填写以下两项。使用 GitHub Actions 部署时，在 `ENV_FILE` 中设置相同变量。

| 变量名 | 内容 |
| --- | --- |
| `PUBLIC_ARTALK_HOST` | Artalk 服务的公开地址，例如 `https://artalk.example.com` |
| `PUBLIC_ARTALK_SITE_NAME` | Artalk 后台的站点名称，例如 `cloverta-blog` |

Artalk 的可信域名需包含博客的来源地址。博文和栏目使用 `/posts/…/` 和 `/series/…/` 作为讨论键，中英文版本共用同一讨论串。

如果本地预览也连接此 Artalk 服务，请在 Artalk 的 `trusted_domains` 中加入预览的完整来源，例如 `http://localhost:4321`。协议、主机名和端口需与浏览器地址一致。编辑服务器上的 `data/artalk.yml` 后重启 Artalk。
