export default {
  wsUrl() {
    if (this.ws.port !== 80) {
      return `${this.ws.prot}://${this.ws.host}:${this.ws.port}`;
    } else {
      return `${this.ws.prot}://${this.ws.host}`;
    }
  }
};
