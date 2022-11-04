const { withPlausibleProxy } = require('next-plausible');

module.exports = withPlausibleProxy()({
  images: {
    domains: ['t.scdn.co', 'i.scdn.co', 'mosaic.scdn.co'],
  },
});
