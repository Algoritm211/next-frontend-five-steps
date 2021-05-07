import React, {useEffect, useState} from 'react';
import styles from "../MainLayout/MainPage.module.css";
import Header from "../Header/Header";
import ReactPaginate from "react-paginate";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getArticlesFilters, getPage} from "../../store/articles-reducer/articles-selector";
import {setFilters} from "../../store/articles-reducer/articles-reducer";
import {getAllCourses} from "../../store/courses-reducer/courses-thunks";
import ArticleCard from "./ArticleCard/ArticleCard";

export const allFiltersOnPage = ['article', 'video', 'podcast']

const Blog = ({articles, articlesCount}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const filters = useSelector(getArticlesFilters)
  const page = useSelector(getPage)
  const [currentPage, setCurrentPage] = useState(1)


  useEffect(() => {
    const page = +router.query.page || 1
    const filters = router.query.filters ? router.query.filters.split(',') : allFiltersOnPage
    router.push(`/blog?page=${page}&filters=${filters.join(',')}`)
    setCurrentPage(page)
  }, [])

  useEffect(() => {
    router.push(`/blog?page=${currentPage}&filters=${filters.join(',')}`)
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(1)
    router.push(`/blog?page=${1}&filters=${filters.join(',')}`)
  }, [filters])

  const onPageChange = (pageInfo) => {
    setCurrentPage(pageInfo.selected + 1)
  }

  const onFilterChange = (event) => {
    const category = event.target.getAttribute('name')
    let newFilters = [...filters]
    if (filters.includes(category)) {
      newFilters = newFilters.filter(item => item !== category)
      if (newFilters.length !== allFiltersOnPage.length) {
        newFilters = newFilters.filter(item => item !== 'all')
      }
    } else {
      newFilters.push(category)
    }

    dispatch(setFilters(newFilters))
    dispatch(getAllCourses(page, newFilters))
  }

  const articlesBlock = articles.map((article) => {
    return <ArticleCard article={article} key={article._id} />
  })

  return (
    <React.Fragment>
      <div className={styles.header}>
        <Header />
      </div>
      <div className='container mt-5'>
        <h1 className='guid-title'>Профорієнтація</h1>
        <h3 className='guid-subtitle'>Цікаві статті для розвитку та пошуку себе</h3>
        <div className='guid-journal'>
          <div className='guid-journal-results mt-5 mb-3'>
            <div className='d-flex guid-journal-l'>
              <span className='guid-materials'>Показано матеріалів: {articles.length} з&nbsp;</span><span
              className='guid-materials'>{articlesCount}</span>
            </div>
            <div className='d-flex guid-journal-r'>
              <input className='guid-checkbox' type='checkbox' onChange={onFilterChange}
                     checked={filters.includes('article')}
                     id='articles'
                     name='article' />
              <label className='guid-label' htmlFor='article'>Статті</label>
              <input type='checkbox' id='podcasts' name='podcast' onChange={onFilterChange}
                     checked={filters.includes('podcast')} />
              <label className='guid-label' htmlFor='podcast'>Подкасти</label>
              <input type='checkbox' id='video' name='video' onChange={onFilterChange}
                     checked={filters.includes('video')} />
              <label className='guid-label' htmlFor='video'>Відео</label>
            </div>
          </div>
          <div className='d-flex row'>
            <div className='pagination-wrap mobile-pagination mb-5'>
              <ReactPaginate
                forcePage={currentPage - 1}
                onPageChange={onPageChange}
                pageCount={Math.ceil(articlesCount / 6)}
                pageRangeDisplayed={5}
                marginPagesDisplayed={5}
                pageClassName={'pagination-page'}
                pageLinkClassName={'pagination-link'}
                containerClassName={'pagination-container'}
                previousClassName={'pagination-prev'}
                previousLabel={<i className='fas fa-long-arrow-alt-left' />}
                nextLabel={<i className='fas fa-long-arrow-alt-right' />}
                breakLabel={<i className='fas fa-ellipsis-h pagination-break' />}
                nextClassName={'pagination-next'}
                previousLinkClassName={'pagination-arrow'}
                nextLinkClassName={'pagination-arrow'}
                disabledClassName={'pagination-disabled'}
                activeClassName={'pagination-active'} />
            </div>
            {articlesBlock}
          </div>
          <div className='d-flex pagination-wrap mb-5'>
            <ReactPaginate
              forcePage={currentPage - 1}
              onPageChange={onPageChange}
              pageCount={Math.ceil(articlesCount / 6)}
              pageRangeDisplayed={5}
              marginPagesDisplayed={5}
              pageClassName={'pagination-page'}
              pageLinkClassName={'pagination-link'}
              containerClassName={'pagination-container'}
              previousClassName={'pagination-prev'}
              previousLabel={<i className='fas fa-long-arrow-alt-left' />}
              nextLabel={<i className='fas fa-long-arrow-alt-right' />}
              breakLabel={<i className='fas fa-ellipsis-h pagination-break' />}
              nextClassName={'pagination-next'}
              previousLinkClassName={'pagination-arrow'}
              nextLinkClassName={'pagination-arrow'}
              disabledClassName={'pagination-disabled'}
              activeClassName={'pagination-active'} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Blog;

function filterArticles(articlesArray, filterObj) {
  const newArticleArray = []
  articlesArray.forEach((article) => {
    if (filterObj[article.category]) {
      newArticleArray.push(article)
    }
  })
  return newArticleArray
}
