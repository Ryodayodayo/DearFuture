import { DiaryEdit } from "../components/DiaryEdit"
import { useState } from "react"


export const Diary = () => {

    const [isModalOpen, setIsModalOpen ] = useState (false)

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>モーダルを開く</button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>モーダルの中身</h2>
                <p>これはモーダルウィンドウです。</p>
            </Modal>
        </div>
    );
}