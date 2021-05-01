import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { coursesAPI } from '../../../api/courses-api'
import { setCurrentCourse } from '../../../store/courses-reducer/courses-reducer'
import {useRouter} from "next/router";

const createCourseValidationSchema = Yup.object().shape({
	title: Yup.string()
		.required('Назва обов`язково повинна бути присутня')
		.max(40, 'Назва має бути не більш ніж 40 символів')
		.matches(/[^<>%$]/i, 'Присутні заборонені символи'),
	description: Yup.string()
		.required('Опис обов`язково повинен бути присутнім')
		.min(20, 'Опис має бути більш ніж 20 символів')
		.matches(/[^<>%$]/i, 'Присутні заборонені символи'),
	category: Yup.string()
		.required('Обов`язково треба вибрати категорію'),
})

const CourseModal = ({ isModalOpen, setIsModalOpen }) => {
	const dispatch = useDispatch()
	const router = useRouter()
	const formik = useFormik({
		enableReinitialize: true,
		validationSchema: createCourseValidationSchema,
		initialValues: {
			title: '',
			description: '',
			category: '',
		},
		onSubmit: async (values) => {
			const data = await coursesAPI.createCourse(values)
			dispatch(setCurrentCourse(data.course))
			await router.push('/editor')
		},
	})

	return (
		<div id='exampleModal' className={`modal addNewCourse ${isModalOpen ? 'active' : ''}`} tabIndex='-1'>
			<div className='modal-dialog'>
				<form onSubmit={formik.handleSubmit} className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>Створення нового курсу</h5>
						<button type='button' className='btn-close'
										data-bs-dismiss='modal'
										aria-label='Close' onClick={() => setIsModalOpen(false)}/>
					</div>
					<div className='modal-body'>
						<p>Будь ласка, введіть назву та опис вашого курсу. <br />Оберіть його категорію.</p>
						<div className='row d-flex mb-3'>
							<div className='col-12'>
								<span className='info-title'>Назва курсу</span>
								<input maxLength='39'
											 className={'inputAcc'}
											 value={formik.values.title}
											 onChange={formik.handleChange}
											 type='text'
											 name='title'
											 id='title' />
								{formik.errors.title}
							</div>
						</div>
						<div className='row d-flex mb-3'>
							<div className='col-12'>
								<span className='info-title'>Опис курсу</span>
								<textarea maxLength='120' style={{ resize: 'none', height: '100px' }}
													value={formik.values.description}
													onChange={formik.handleChange}
													className='form-control inputAcc'
													placeholder='Розкажіть про курс в декілька рядків'
													name={'description'}
													id='descriptionCourse' />
								{formik.errors.description}
							</div>
						</div>
						<div className='row d-flex mb-3'>
							<div className='col-12'>
								<div className='info-title'>Оберіть категорію курсу</div>
								<select
									value={formik.values.category}
									onChange={formik.handleChange}
									name={'category'}
									id={'category'}
									className='form-select mr-1 me-2'
									aria-label='Default select example'>
									<option defaultValue>Категорія</option>
									<option value='design'>Дизайн</option>
									<option value='business'>Бізнес</option>
									<option value='education'>Освіта</option>
									<option value='marketing'>Маркетинг</option>
									<option value='it'>IT</option>
								</select>
							</div>
								{formik.errors.category}
						</div>
					</div>
					<div className='modal-footer'>
						<button type='submit' className='btn btn-primary'>Створити курс</button>
						<button type='button' className='btn btn-danger'
										data-bs-dismiss='modal' onClick={() => setIsModalOpen(false)}>Скасувати
						</button>

					</div>

				</form>
			</div>
		</div>
	)
}

export default CourseModal
