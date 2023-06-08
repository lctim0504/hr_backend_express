# 使用 Node.js 作為基礎映像檔
FROM node:18

# 將工作目錄設置為 React 專案的根目錄
WORKDIR /app

# 將 React 專案的所有文件複製到映像檔中
COPY . .

# 安裝依賴包
RUN npm install

ENV DB_NAME: $DB_NAME
ENV DB_USER: $DB_USER
ENV DB_PASS: $DB_PASS
ENV DB_SERVER: $DB_SERVER
ENV JWT: $JWT

# 暴露端口號 3001 => docker run -p 3001:3000 -d react-docker-demo
EXPOSE 5000

# 執行專案
CMD ["npm", "start"]

