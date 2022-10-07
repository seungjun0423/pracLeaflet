import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <title>과수화상병 클론 코딩</title>
        <meta name="서비스 설명" content="과수화상병 모니터링 클론 코딩" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
        <body>
          <Main />
        </body>
        <NextScript />
      </Html>
    );
  }
}