import React from 'react'
import Head from 'next/head'

const CoursePageHead = ({
  course,
  title, // 50-55 symbols
  description, // information for snippet, 160 symbols
  keywords, // array of keywords not more than 10
}) => {
  return (
    <Head>
      <title>{course.title}</title>
      <meta name='description' content={course.description} />
      <meta name='robots' content='index,follow' />
      <meta name='keywords' content={keywords.join(', ')} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={course.title} />
      <meta property='og:description' content={course.description} />
      <meta property='og:url' content={`${process.env.NEXT_PUBLIC_APP_URL}/course/${course._id}`} />
      <meta property='og:image' content='https://cdn.mos.cms.futurecdn.net/6bxva8DmZvNj8kaVrQZZMP.jpg' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:image' content='https://cdn.mos.cms.futurecdn.net/6bxva8DmZvNj8kaVrQZZMP.jpg' />
    </Head>

  )
}

export default CoursePageHead
