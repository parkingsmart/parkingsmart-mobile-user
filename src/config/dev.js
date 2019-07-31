import default_config from './default';

export default Object.assign({}, default_config, {
  // websocks server config
  ws: {
    prot: 'ws',
    host: '127.0.0.1',
    port: '8080'
  }
});
