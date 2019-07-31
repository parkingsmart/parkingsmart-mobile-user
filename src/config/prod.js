import default_config from './default';

export default Object.assign({}, default_config, {
  // websocks server config
  ws: {
    prot: 'ws',
    host: '39.98.167.61',
    port: '80'
  }
});
