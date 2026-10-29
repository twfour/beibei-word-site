# 每日高考作文训练网站

将 Knowledge Hub 中的每日高考作文训练生成静态档案，并发布到：

<https://chinese.qinyibin.com/gaokao/>

## 更新内容

```bash
cd /Users/apple/Documents/贝贝外刊
python3 gaokao/scripts/build_gaokao_site.py
python3 gaokao/scripts/verify_gaokao_site.py
```

生成器默认读取：

```text
/Users/apple/Documents/Knowledge Hub/10-Education/High School/Chinese/真题库/作文真题/每日高考作文训练
```

也可以通过 `--source` 指定其他目录。

## 本地预览

```bash
python3 -m http.server 8765 --directory gaokao
```

打开 <http://127.0.0.1:8765/>。

## 发布

```bash
bash gaokao/deploy/deploy_static.sh
```

服务器第一次接入时，需要将 `deploy/nginx-location.conf` 中的两个 location 块加入 `chinese.qinyibin.com` 的 HTTPS server 配置，并执行 `nginx -t` 后重载 Nginx。
