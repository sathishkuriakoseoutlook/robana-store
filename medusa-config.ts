import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // tell Medusa where Redis is
    redisUrl: process.env.REDIS_URL ,
    workerMode:process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server",
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: { 
    disable: process.env.DISABLE_MEDUSA_ADMIN === 'true',
    backendUrl: process.env.MEDUSA_ADMIN_BACKEND_URL || "https://robana-store-production.up.railway.app:9000",
  },
    // Configure Medusa modules to use Redis for event bus and cache
  
  modules: {
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        // package expects a connection/url to Redis
        redisUrl: process.env.REDIS_URL,
      },
    },
    cacheService: {
      resolve: "@medusajs/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    workflowService: {
      resolve: "@medusajs/workflow-engine-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
        prefix: "medusa_workflow",
      },
    },    
  },
  
})
