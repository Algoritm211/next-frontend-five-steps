import React from 'react'
import Link from "next/link";

const articlePreview1 = '/assets/article/articlePrev.jpeg'
const articlePreview2 = '/assets/article/articlePrev2.jpeg'
const articlePreview3 = '/assets/article/articlePrev3.jpg'

const categoryToUkr = {
	video: 'Відео',
	article: 'Стаття',
	podcast: 'Подкаст'
}

const goToPageUkr = {
	video: 'Переглянути',
	article: 'Прочитати',
	podcast: 'Прослухати'
}

const articlePreview =({
	video: articlePreview1,
	article: articlePreview2,
	podcast: articlePreview3
})

const ArticleCard = ({ article }) => {


	const { title, body, category, views, releaseDate } = article

	return (
		<div className='col-md-4 col-sm-6 col-12 guid-card-item mb-5'>
			<Link href=''>
				<img className='guid-card-img mb-3'
						 src={articlePreview[category]}
						 alt='guid-card-item' />
			</Link>
			<div className='d-flex mb-3 guid-card-article'>
				<i className='far fa-newspaper guid-card-ill' />
				<span className='guid-card-type'>{categoryToUkr[category]}</span>
			</div>
			<div className='d-flex mb-3 '>
				<Link href={'#'} className='guid-card-title'>{title}</Link>
			</div>
			<div className='d-flex mb-3'>
				<Link href='#' className='guid-card-subtitle'>{goToPageUkr[category]}</Link>
				<i className='fas fa-long-arrow-alt-right guid-card-ill'
					 style={{ fontSize: '12px', color: '#f26c4f' }} />
			</div>
		</div>
	)
}

export default ArticleCard
