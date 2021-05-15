import React from 'react'
import { wrapper } from '../store/store'
import { articlesAPI } from '../api/articles-api'
import Blog, { allFiltersOnPage } from '../components/Blog/Blog'
import CustomHead from '../components/CustomHead/CustomHead'

const BlogPage = ({ articles, articlesCount }) => {
  return (
    <>
      <CustomHead
        title={'Корисні статті'}
        keywords={[
          'курсы',
          'обучение',
          'образование',
          'навыки',
          '5 шагов',
          'научиться',
          'платформа',
          'five steps',
        ]}
        description={
          'Именно тут вы можете найти крутые курсы для нахождения новой профессии и приобретения новых навыков'
        }
      />
      <Blog articles={articles} articlesCount={articlesCount} />
    </>
  )
}

export default BlogPage

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const page = +ctx.query.page || 1
  const filters = ctx.query.filters ?
    ctx.query.filters.split(',') :
    allFiltersOnPage

  const data = await articlesAPI.getArticles(page, filters)
  return {
    props: {
      articles: data.articles,
      articlesCount: data.articlesCount,
    },
  }
})
