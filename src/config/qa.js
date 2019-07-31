import default_config from './default';

export default Object.assign({}, default_config, {
  // websocks server config
  ws: {
    prot: 'ws',
    host: '47.92.250.39',
    port: '80'
  }
});
