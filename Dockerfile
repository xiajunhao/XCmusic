# 简单测试镜像：nginx + 自定义首页，用于验证构建/部署链路
FROM uhub.service.ucloud.cn/library/nginx:1.9.7

# 自定义首页内容，方便识别镜像是否生效
RUN echo "hello from test image" > /usr/share/nginx/html/index.html

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=3s CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
