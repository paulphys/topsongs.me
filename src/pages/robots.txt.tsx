import React from 'react';

const getRobots = () => `User-agent: *
Disallow: /
`;

class Sitemap extends React.Component {
  public static async getInitialProps({ res }: { res: any }) {
    res.setHeader('Content-Type', 'text/plain');
    res.write(getRobots());
    res.end();
  }
}

export default Sitemap;
