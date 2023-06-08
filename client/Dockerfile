# 使用 Node.js 作為基礎映像檔
FROM node:18

# 將工作目錄設置為 React 專案的根目錄
WORKDIR /app

# 將 React 專案的所有文件複製到映像檔中
COPY . .

# 安裝依賴包
RUN npm install

# 安裝依賴包
EXPOSE 3000

# 執行專案
CMD ["npm", "start"]


