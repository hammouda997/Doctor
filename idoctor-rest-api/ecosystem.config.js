module.exports = {
  apps: [
    {
      name: "idoctor-api",
      script: "./dist/server.js",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: "one two",
      instances: "max",
      exec_mode: "cluster", // enables clustering
      autorestart: true,
      watch: false,
      max_memory_restart: "4G",
      env: {
        PORT: 4000,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 4000,
        NODE_ENV: "production",
      },
      output: "./logs/out/out.log",
      error: "./logs/error/error.log",
      log: "./logs/combined/combined.outerr.log",
    },
  ],
};
