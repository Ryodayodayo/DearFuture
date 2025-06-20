import { DiaryEdit } from "../components/DiaryEdit"
import { Modal } from "../components/ui/Modal"
import { useState } from "react"


export const Diary = () => {

    const [isModalOpen, setIsModalOpen ] = useState (false)

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>モーダルを開く</button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <DiaryEdit />
            </Modal>
        </div>
    );
}