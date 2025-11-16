const mockAxios = {
  // By default, methods return resolved promises with empty results.
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  // create should return an instance with the same API (so axios.create(...) works)
  create: function (config) {
    // You can capture the provided config by attaching it to the instance if needed
    const instance = Object.assign({}, mockAxios);
    instance.defaults = { ...config };
    return instance;
  },
};

// Make sure both CommonJS and default import work
module.exports = mockAxios;
module.exports.default = mockAxios;
