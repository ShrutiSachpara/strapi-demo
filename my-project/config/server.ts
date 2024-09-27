export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 6000),
  app: {
    keys: env.array('APP_KEYS', ['myKeyA', 'myKeyB']), 
  },
   admin: {
    enabled: false,  
  },
});
