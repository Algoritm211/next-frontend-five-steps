import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import MainLayout from '../MainLayout/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentLesson } from '../../store/lesson-reducer/lesson-selector'
import { createLesson, loadLesson, updateLesson } from '../../store/lesson-reducer/lesson-thunks'
import Loader from '../Loader/Loader'
import { getCurrentCourse } from '../../store/courses-reducer/courses-selector'
import Link from "next/link";


const CourseEditor = () => {
	const dispatch = useDispatch()
	const currentLesson = useSelector(getCurrentLesson)
	const course = useSelector(getCurrentCourse)
	const [lessonNumber, setLessonNumber] = useState(1)
	const [isHomework, setIsHomework] = useState(false)
	const [editorBody, setEditorBody] = useState('')
	const [title, setTitle] = useState('')

	useEffect(() => {
		setEditorBody('')
		if (course?._id) {
			dispatch(loadLesson(course?._id, lessonNumber))
		}
	}, [lessonNumber])

	useEffect(() => {
		setTitle(currentLesson ? currentLesson?.title : '')
	}, [lessonNumber, currentLesson])

	if (!course) {
		return <Loader />
	}

	const handleEditorChange = (content, editor) => {
		setEditorBody(content)
	}

	const onSaveLesson = () => {
		if (!currentLesson && !isHomework) {
			dispatch(createLesson({title: title, body: editorBody, homeWork: '', courseId: course._id }))
		} else if (!currentLesson && isHomework) {
			dispatch(createLesson({title: title, body: '', homeWork: editorBody, courseId: course._id }))
		} else {
			if (!isHomework) {
				dispatch(updateLesson({title: title, body: editorBody, homeWork: currentLesson.homeWork, lessonId: currentLesson._id}))
			} else {
				dispatch(updateLesson({title: title, body: currentLesson.body, homeWork: editorBody, lessonId: currentLesson._id}))
			}
		}
	}


	const lessonBlock = [1, 2, 3, 4, 5].map((lNumber) => {
		return (
			<React.Fragment key={lNumber}>
				<div className={`container ${lNumber === lessonNumber && !isHomework ? 'editor-select-active' : 'editor-select'}`}>
					<a to='#' onClick={() => {
						setIsHomework(false)
						setLessonNumber(lNumber)
					}}>
						<p className='editor-step'>Крок {lNumber}</p>
					</a>
				</div>
				<div className={`container editor-task ${lNumber === lessonNumber && isHomework ? 'editor-select-active' : 'editor-select'}`}
						 data-lesson={lNumber}>
					<a to='#' onClick={() => {
						setIsHomework(true)
						setLessonNumber(lNumber)
					}}>
						<p className='editor-step' style={{ marginLeft: '20px' }}>Завдання</p>
					</a>
				</div>
			</React.Fragment>
		)
	})

	return (
		<MainLayout>
			<div className='row m-0'>
				<div className='col-12 col-md-9 mb-3'>
					<div className='mt-3'>
						<span className='info-title d-block'>Назва уроку</span>
						<input className={'inputAcc d-block mb-3'}
							    value={title}
							    onChange={(event) => setTitle(event.target.value)}
							    type='text'
							    name='title'
								id='title' />
					</div>
					<span className='info-title d-block'>Контент уроку</span>
					<div className=''>
					<Editor
						apiKey={'j2rcg8qaqco0x9y81b1jn5dc0ze3phyfbapmnra5q59deqml'}
						value={editorBody}
						initialValue={!isHomework ? currentLesson?.body : currentLesson?.homeWork || ''}
						init={{
							height: 500,
							width: '100%',
							selector: 'textarea',
							plugins: [
								'advlist autolink lists link image charmap print preview hr anchor pagebreak',
								'searchreplace visualblocks code fullscreen',
								'insertdatetime media table paste code help wordcount',
							],
							toolbar:
								`undo redo | formatselect | bold italic backcolor | \
						alignleft aligncenter alignright alignjustify | \
						bullist numlist outdent indent | removeformat | help`,
						}}
						onEditorChange={handleEditorChange}
					/>
					</div>
				</div>
				<div className='col-12 col-md-3 d-block pe-0'>
					<div className='container'>
						<h1 className='editor-title mt-3'>Професія</h1>
						<h3 className='editor-subtitle mb-3'>{course.title}</h3>
					</div>

					<div className='editor-menu'>
						{lessonBlock}
					</div>
					<div className='container d-flex justify-content-center mt-5'>
						<button className='preview-button mb-3' onClick={onSaveLesson}>
							Зберегти
						</button>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}


export default CourseEditor
