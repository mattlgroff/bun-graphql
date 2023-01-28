FROM jarredsumner/bun:0.5.1
WORKDIR /app
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install
COPY ./src ./src
EXPOSE 3000
ENTRYPOINT ["bun", "src/index.js"]