# Quantumult X Scripts

Quantumult X（圈叉）脚本与重写规则，按应用分别维护。

## 虎扑去广告

[在 iPhone 上导入圈叉](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22rewrite_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Fbbnotcode%2Fquantumultx-scripts%2Fmain%2Frewrite%2FHUPU_remove_ads.snippet%2C%20tag%3D%E8%99%8E%E6%89%91%E5%8E%BB%E5%B9%BF%E5%91%8A%2C%20enabled%3Dtrue%22%5D%7D) · [查看规则](rewrite/HUPU_remove_ads.snippet) · [查看脚本](scripts/HUPU_remove_ads.js)

如果点击后没有唤起圈叉，在 Quantumult X 的「重写」中添加远程资源，填入：

```text
https://raw.githubusercontent.com/bbnotcode/quantumultx-scripts/main/rewrite/HUPU_remove_ads.snippet
```

开启重写与 HTTPS 解密（MitM），并完成 Quantumult X 证书安装与信任。资源中包含所需的四个 hostname；导入后检查它们已被加载到 MitM 主机名列表。停用重复的虎扑去广告规则，避免相互覆盖。重启虎扑；若仍显示旧广告，先清除虎扑缓存后重试。无需改动节点或其他应用的分流规则。

### 处理内容

- 请求拦截：广告接口、部分红点、热搜/热词、榜单与横幅接口，共 8 条规则。
- 响应处理：顶部横幅、部分推广入口、“我的应用”模块与会员推广信息，共 4 条规则。
- 保留原插件的清理项目，包括隐藏个性换肤、专家预测、邀请好友、版主中心、JRs战术板、草稿箱、58同城等入口。

适配基于 2026-10-02 版本的 Loon 插件与 2026-11-01 取得的配套脚本。转换为圈叉的 `reject-dict`、`reject-200` 与 `script-response-body`，脚本由本仓库提供，不在运行时依赖 kelee.one。增加 JSON 异常和缺失字段保护，遇到未知结构时保留原响应。

### 验证范围

已进行规则匹配检查与模拟响应测试；尚未在 iPhone 虎扑中实机验证。两条源规则仅匹配 `3/8.0.86`，其余版本范围沿用源插件；新版虎扑若更换接口，可能需要更新。此资源不保证移除所有广告。

### 来源与署名

- 原作者：[ZenmoFeiShi](https://github.com/ZenmoFeiShi)。
- Loon 规则公开上游：[HUPU_remove_ads.lpx](https://raw.githubusercontent.com/fkingikelee/fkikelee/main/lpx/HUPU_remove_ads.lpx)。
- [配套原脚本](https://kelee.one/Resource/JavaScript/HUPU/HUPU_remove_ads.js)，原脚本注明引用 `https://raw.githubusercontent.com/ZenmoFeiShi/Qx/main/HP.js`。
- [Quantumult X 官方配置示例](https://github.com/crossutility/Quantumult-X/blob/master/sample.conf)与[导入链接说明](https://github.com/crossutility/Quantumult-X/blob/master/url-scheme.md)。

本仓库保留来源与作者署名；上游作品权利归原作者，未对上游作品另行授予许可。
