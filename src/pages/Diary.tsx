import { DiaryEdit } from "../components/DiaryEdit"
import { Modal } from "../components/ui/Modal"
import { useState } from "react"
import { DiaryList } from "../components/DiaryList"
import styles from "./Diary.module.css"

export const Diary = () => {

    const [isModalOpen, setIsModalOpen ] = useState (false)

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>日記を作成</button>
            <div className = {styles.container}>
                <DiaryList />
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <DiaryEdit />
                </Modal>
            </div>
        </div>
    );
}