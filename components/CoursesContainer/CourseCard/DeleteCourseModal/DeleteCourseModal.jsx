import React from 'react'

import {useDispatch} from "react-redux";
import {toggleDeleteCourse} from "../../../../store/courses-reducer/courses-thunks";




const DeleteCourseModal = ({ isModalOpen, setIsModalOpen, id }) => {
    const dispatch = useDispatch()
    const course = id

    const disableModal = (event) =>{
        event.stopPropagation()
        event.preventDefault()
        setIsModalOpen(false)
    }

    const onDeleteHandler = () => {
        dispatch(toggleDeleteCourse(course))
    }

    return (
        <div id='exampleModal' className={`modal logoutExit ${isModalOpen ? 'active' : ''}`} tabIndex='-1'>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Увага!</h5>
                        <button onClick={(event) => disableModal(event)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Ви впевнені, що хочете видалити курс?
                    </div>
                    <div className="modal-footer">
                        <button onClick={(event) => disableModal(event)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Повернутися</button>
                        <button onClick={(event) => { onDeleteHandler(); disableModal(event);}} type="button" className="btn btn-danger">Видалити</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteCourseModal
