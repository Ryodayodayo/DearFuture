import { DiaryEdit } from "../components/DiaryEdit"
import { Modal } from "../components/ui/Modal"
import { useState } from "react"
import styles from "./Diary.module.css"

export const Diary = () => {

    const [isModalOpen, setIsModalOpen ] = useState (false)

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>モーダルを開く</button>
            <div className = {styles.container}>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <DiaryEdit />
                </Modal>
            </div>
        </div>
    );
}