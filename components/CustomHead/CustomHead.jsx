import React from 'react';
import Head from "next/head";

const CustomHead = ({
                      title, // 50-55 symbols
                      description, // information for snippet, 160 symbols
                      keywords, // array of keywords not more than 10
                    }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="robots" content="index,follow"/>
      <meta name="keywords" content={keywords.join(', ')}/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </Head>
  );
};

export default CustomHead;
