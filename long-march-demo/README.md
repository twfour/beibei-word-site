# 长征研学 · 星火档案

面向初中一年级学生的移动端长征主题交互原型，采用历史档案册式视觉和结构化精读方式。

## 本地预览

```bash
python3 -m http.server 8003 --directory long-march-demo
```

打开 <http://127.0.0.1:8003/>。

## 线上地址

<https://chinese.qinyibin.com/changzheng/>

## 部署

首次部署需要将 `deploy/nginx-location.conf` 中的两个 location 添加到
`chinese.qinyibin.com` 的 HTTPS server block。之后运行：

```bash
bash long-march-demo/deploy/deploy_static.sh
```

部署脚本使用带时间戳的 release 目录，并通过 `current` 符号链接进行原子切换。
