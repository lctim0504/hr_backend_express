# 使用 Node.js 作為基礎映像檔
FROM node:18.15.0-alpine3.16

# 將工作目錄設置為 React 專案的根目錄
WORKDIR /app

# 將 React 專案的所有文件複製到映像檔中
COPY . .

# 安裝依賴包
RUN cd server && npm install

# 暴露端口號 3001 => docker run -p 3001:3000 -d react-docker-demo
EXPOSE 5000

# 執行專案
CMD ["sh", "-c", "cd server && npm start"]

