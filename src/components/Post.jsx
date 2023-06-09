import React from "react";

const Post = ({name, password, title, text, viewsCount, id, createdAt, updatedAt, countTen, resCountTen, deletePostButtonHandler, editPostButtonHandler}) => {

    return (
        <div className="post-content">
            <p>{'id: ' + id}</p>
            <p>{'title: ' + title}</p>
            <p>{'text: ' + text}</p>
            <p>{'countTen: ' + countTen}</p>
            <p>{'resCountTen: ' + resCountTen}</p>
            <p>{'createdAt: ' + createdAt}</p>
            <button onClick={() => editPostButtonHandler(id)}>Редактировать пост</button>
            <button onClick={() => deletePostButtonHandler(id)}>Удалить пост</button>
        </div>
    )
}

export default Post