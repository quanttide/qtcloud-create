#!/bin/bash
# 为 lite.create.cloud.quanttide.com 配置 CDN（源站 OSS 桶 qtcloud-create-lite）+ HTTPS 证书 + DNS CNAME。
#
# 对齐 qtcloud 的 configure-lite-cdn.sh 惯例：桶与网站托管用 ossutil 建，CDN 与证书走本脚本；
# 发布见 .github/workflows/deploy-lite.yml。
#
# 证书为 acme.sh 单域名（*.quanttide.com / *.cloud.quanttide.com 泛域名不覆盖三层子域），
# 续期 reloadcmd 自动重绑 CDN：~/.acme.sh/deploy-cdn-cert-create-lite.sh
#
# 前置：本机已登录 aliyun CLI（AK 模式）；acme.sh 已签发该域名证书。
# 幂等：各步已存在则跳过，可重复执行。
set -euo pipefail

DOMAIN='lite.create.cloud.quanttide.com'
BUCKET='qtcloud-create-lite'
ALIYUN="$HOME/.local/bin/aliyun"
CERT_DIR="$HOME/.acme.sh/${DOMAIN}_ecc"

[ -f "$CERT_DIR/fullchain.cer" ] || { echo "证书不存在：$CERT_DIR（先 acme.sh --issue -d $DOMAIN --dns dns_ali --keylength ec-256）" >&2; exit 1; }

echo "=== 1. 建 CDN 域名（已存在则跳过）==="
if "$ALIYUN" cdn DescribeCdnDomainDetail --DomainName "$DOMAIN" >/dev/null 2>&1; then
  echo "CDN 域名已存在，跳过"
else
  "$ALIYUN" cdn AddCdnDomain \
    --DomainName "$DOMAIN" \
    --CdnType web \
    --Sources "[{\"content\":\"${BUCKET}.oss-cn-hangzhou.aliyuncs.com\",\"type\":\"oss\",\"port\":80,\"priority\":20}]"
fi

echo "=== 2. 私有回源 + 根改写 + 强制 HTTPS ==="
# 桶是 private（2024 后新桶默认阻止公共访问），CDN 侧开私有回源鉴权；
# 根路径改写解决私有回源与 OSS 网站托管默认首页的已知冲突（/ 回源 403）
"$ALIYUN" cdn BatchSetCdnDomainConfig --DomainNames "$DOMAIN" --Functions '[
 {"functionName":"l2_oss_key","functionArgs":[{"argName":"private_oss_auth","argValue":"on"}]},
 {"functionName":"back_to_origin_url_rewrite","functionArgs":[{"argName":"source_url","argValue":"^/$"},{"argName":"target_url","argValue":"/index.html"},{"argName":"flag","argValue":"break"}]},
 {"functionName":"https_force","functionArgs":[{"argName":"enable","argValue":"on"}]}
]' >/dev/null
echo "三件套已配置"

echo "=== 3. 绑定 HTTPS 证书（CDN）==="
# PEM 保留换行（压成单行会报 InvalidSSLPub）
"$ALIYUN" cdn SetCdnDomainSSLCertificate \
  --DomainName "$DOMAIN" \
  --CertType upload \
  --SSLProtocol on \
  --SSLPub "$(cat "$CERT_DIR/fullchain.cer")" \
  --SSLPri "$(cat "$CERT_DIR/${DOMAIN}.key")"
echo "证书已绑定"

echo "=== 4. DNS CNAME（已存在则跳过）==="
# RRKeyWord 会误匹配前缀，需在结果里精确过滤 RR 且 Type=CNAME
EXISTING=$("$ALIYUN" alidns DescribeDomainRecords --DomainName quanttide.com --RRKeyWord lite.create.cloud 2>/dev/null | python3 -c "
import sys, json
try:
    recs = json.load(sys.stdin).get('DomainRecords', {}).get('Record', [])
    print(len([r for r in recs if r.get('RR') == 'lite.create.cloud' and r.get('Type') == 'CNAME']))
except Exception:
    print(0)
")
if [ "$EXISTING" -gt 0 ]; then
  echo "CNAME 记录已存在，跳过"
else
  "$ALIYUN" alidns AddDomainRecord \
    --DomainName quanttide.com \
    --RR lite.create.cloud \
    --Type CNAME \
    --Value "${DOMAIN}.w.kunlunaq.com"
fi

echo "=== 完成：https://${DOMAIN}/ ===="
